const { Order, Key, Product, Setting } = require('../models');
const { createPaymentOrder, verifyPayment, getGatewayConfig } = require('../utils/quickGateway');

// ─── Configuration ──────────────────────────────────────────
const RESERVATION_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const MAX_RETRY_ATTEMPTS = 3;

// ─── Helpers ────────────────────────────────────────────────

/**
 * Clean up expired key reservations (called on each initiate)
 * This ensures keys locked by abandoned payments become available again
 */
async function cleanupExpiredReservations() {
  try {
    const result = await Key.updateMany(
      {
        status: 'payment_pending',
        reservationExpiresAt: { $lte: new Date() },
      },
      {
        $set: {
          status: 'available',
          reservedAt: null,
          reservationExpiresAt: null,
        },
      }
    );
    if (result.modifiedCount > 0) {
      console.log(`🧹 Cleaned up ${result.modifiedCount} expired key reservations`);
    }
  } catch (error) {
    console.error('❌ Cleanup error:', error.message);
  }
}

// ─── Step 1: Initiate ──────────────────────────────────────

// @desc    Initiate order — atomically reserve a key + return payment info
// @route   POST /api/orders/initiate
const initiateOrder = async (req, res, next) => {
  try {
    const { productId, durationValue, durationUnit, customerEmail = '' } = req.body;

    // 1. Clean up any expired reservations first
    await cleanupExpiredReservations();

    // 2. Validate product
    const product = await Product.findById(productId).lean();
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const duration = product.durations.find(
      (d) => d.value === durationValue && d.unit === durationUnit
    );
    if (!duration) {
      res.status(400);
      throw new Error('Invalid duration selected');
    }

    // 3. Atomically reserve a key (only 'available' ones)
    const reservedKey = await Key.findOneAndUpdate(
      {
        productId,
        durationValue,
        durationUnit,
        status: 'available',
      },
      {
        $set: {
          status: 'payment_pending',
          reservedAt: new Date(),
          reservationExpiresAt: new Date(Date.now() + RESERVATION_TIMEOUT_MS),
        },
      },
      { new: true }
    );

    if (!reservedKey) {
      res.status(409); // Conflict
      throw new Error('All keys for this duration are currently sold or reserved. Please try a different duration or come back later.');
    }

    // 4. Get payment gateway config
    const settings = await Setting.findOne({ key: 'payment_gateway' }).lean();
    const gatewayConfig = getGatewayConfig(settings?.value);

    if (!gatewayConfig.isActive) {
      // Release the key if gateway is inactive
      await Key.findByIdAndUpdate(reservedKey._id, {
        $set: { status: 'available', reservedAt: null, reservationExpiresAt: null },
      });
      res.status(400);
      throw new Error('Payment gateway is not configured. Please contact admin.');
    }

    // 5. 🔥 Check Flash Sale — use flash price if active
    const isFlashActive = duration.flashSale?.isActive && 
      duration.flashSale?.flashPrice != null && 
      duration.flashSale?.endAt && 
      new Date(duration.flashSale.endAt) > new Date();
    const payableAmount = isFlashActive ? duration.flashSale.flashPrice : duration.price;

    // 6. 🔥 Create payment order on QuickGateway (with correct price)
    const gatewayOrder = await createPaymentOrder(payableAmount, gatewayConfig.merchantToken);

    if (!gatewayOrder.success) {
      // Release key if gateway order creation fails
      await Key.findByIdAndUpdate(reservedKey._id, {
        $set: { status: 'available', reservedAt: null, reservationExpiresAt: null },
      });
      res.status(502);
      throw new Error('Payment gateway order creation failed: ' + (gatewayOrder.message || 'Unknown error'));
    }

    // 7. Return full payment details to frontend
    res.json({
      success: true,
      data: {
        reservationId: reservedKey._id.toString(),
        productId: product._id,
        productTitle: product.title,
        duration: duration.label,
        amount: payableAmount,
        originalPrice: duration.price,
        isFlashSale: isFlashActive,
        durationValue: duration.value,
        durationUnit: duration.unit,
        customerEmail: customerEmail || req.user?.email || '',
        // ✅ QuickGateway order details (server-created, secure)
        gateway: {
          paymentId: gatewayOrder.paymentId,
          paymentUrl: gatewayOrder.paymentUrl,
          qrData: gatewayOrder.qrData,
          merchantToken: gatewayConfig.merchantToken, // still pass for SDK if needed
        },
        // Reservation timeout info
        expiresInMinutes: RESERVATION_TIMEOUT_MS / 60000,
        _flashApplied: isFlashActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Step 2: Complete ──────────────────────────────────────

// @desc    Complete order — verify payment with QuickGateway API, then deliver key
// @route   POST /api/orders/complete
const completeOrder = async (req, res, next) => {
  try {
    const { productId, durationValue, durationUnit, paymentId, customerEmail = '' } = req.body;

    // 1. Validate required fields
    if (!paymentId) {
      res.status(400);
      throw new Error('Payment ID is required');
    }
    if (!productId) {
      res.status(400);
      throw new Error('Product ID is required');
    }

    // 2. 🔒 Anti-bypass: Check if this paymentId was ALREADY used
    //    This prevents replay attacks where someone tries to use the same paymentId twice
    const existingOrder = await Order.findOne({ paymentId }).lean();
    if (existingOrder) {
      // Payment already processed — return the existing key
      const existingKey = await Key.findById(existingOrder.items[0]?.keyId).lean();
      if (existingKey) {
        return res.json({
          success: true,
          data: {
            orderId: existingOrder._id,
            key: existingKey.keyValue,
            product: existingOrder.items[0]?.selectedDuration?.label || '',
            duration: existingOrder.items[0]?.selectedDuration?.label || '',
            amount: existingOrder.totalAmount,
            paymentId: paymentId,
            message: 'Payment was already processed earlier',
          },
        });
      }
      // Edge case: order exists but key reference broken
      res.status(409);
      throw new Error('This payment was already processed. Please contact support.');
    }

    // 3. 🔒 Server-to-server payment verification with QuickGateway
    //    This is the CRITICAL security step — never trust frontend-only verification
    const settings = await Setting.findOne({ key: 'payment_gateway' }).lean();
    const gatewayConfig = getGatewayConfig(settings?.value);

    if (!gatewayConfig.merchantToken) {
      res.status(500);
      throw new Error('Payment gateway not configured. Admin must set Merchant Token in Settings.');
    }

    const verification = await verifyPayment(paymentId, gatewayConfig.merchantToken);

    if (!verification.success) {
      // Payment not verified — release any reserved keys for this payment attempt
      await Key.updateMany(
        {
          productId,
          durationValue,
          durationUnit,
          status: 'payment_pending',
          reservationExpiresAt: { $gte: new Date() },
        },
        {
          $set: { status: 'available', reservedAt: null, reservationExpiresAt: null },
        }
      );

      res.status(402); // Payment Required
      throw new Error('Payment verification failed: ' + (verification.data?.message || 'Could not verify payment with gateway'));
    }

    // 4. ✅ Payment verified! Now atomically assign a reserved key
    //    Try to get a payment_pending key first, then fallback to available
    let key = await Key.findOneAndUpdate(
      {
        productId,
        durationValue,
        durationUnit,
        status: 'payment_pending',
      },
      {
        $set: {
          status: 'sold',
          orderId: null, // Will update after order creation
          soldAt: new Date(),
          reservedAt: null,
          reservationExpiresAt: null,
        },
      },
      { new: true, sort: { reservedAt: 1 } } // FIFO: oldest reservation first
    );

    // If no pending key found (edge case), try to grab an available one
    if (!key) {
      key = await Key.findOneAndUpdate(
        {
          productId,
          durationValue,
          durationUnit,
          status: 'available',
        },
        {
          $set: {
            status: 'sold',
            soldAt: new Date(),
          },
        },
        { new: true }
      );
    }

    if (!key) {
      // ⚠️ Payment succeeded but NO keys available!
      // In production: trigger automatic refund here
      res.status(409);
      throw new Error('Payment successful but all keys are sold out! Your refund will be processed automatically. Contact support if not received within 24 hours.');
    }

    // 5. Create confirmed order
    const product = await Product.findById(productId).lean();
    const duration = product.durations.find(
      (d) => d.value === durationValue && d.unit === durationUnit
    );

    // Check flash sale
    const isFlashActive = duration.flashSale?.isActive && 
      duration.flashSale?.flashPrice != null && 
      duration.flashSale?.endAt && 
      new Date(duration.flashSale.endAt) > new Date();
    const paidAmount = isFlashActive ? duration.flashSale.flashPrice : duration.price;

    const order = await Order.create({
      userId: req.user?._id || null,
      customerEmail: customerEmail || req.user?.email || '',
      items: [{
        productId,
        keyId: key._id,
        selectedDuration: {
          label: duration.label,
          value: duration.value,
          unit: duration.unit,
          price: paidAmount,
          originalPrice: duration.price,
        },
      }],
      totalAmount: paidAmount,
      paymentId: paymentId,
      paymentStatus: 'completed',
      orderStatus: 'completed',
    });

    // 6. Link order to key
    key.orderId = order._id;
    await key.save();

    // 7. Update product sold count
    await Product.findByIdAndUpdate(productId, {
      $inc: { soldKeys: 1 },
    });

    // 8. 🎉 Return key & full transaction details to customer
    res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        key: key.keyValue,
        product: product.title,
        duration: duration.label,
        amount: paidAmount,
        paymentId: paymentId,
        transactionId: verification.data?.transactionId || paymentId,
        purchasedAt: order.createdAt || new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Orders : List ─────────────────────────────────────────

// @desc    Get user's orders
// @route   GET /api/orders/my
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.productId', 'title image')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find()
        .populate('items.productId', 'title')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Order.countDocuments(),
    ]);

    res.json({
      success: true,
      count: orders.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Release a reserved key back to available (when gateway fails/cancels)
// @route   POST /api/orders/release
const releaseReservation = async (req, res, next) => {
  try {
    const { reservationId } = req.body;
    if (!reservationId) {
      res.status(400);
      throw new Error('Reservation ID is required');
    }
    const key = await Key.findOneAndUpdate(
      { _id: reservationId, status: 'payment_pending' },
      { $set: { status: 'available', reservedAt: null, reservationExpiresAt: null } },
      { new: true }
    );
    if (!key) {
      return res.json({ success: false, message: 'Reservation not found or already expired/processed' });
    }
    res.json({ success: true, message: 'Key released back to available pool' });
  } catch (error) {
    next(error);
  }
};

module.exports = { initiateOrder, completeOrder, releaseReservation, getMyOrders, getAllOrders };
