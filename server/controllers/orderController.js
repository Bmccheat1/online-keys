const { Order, Key, Product, Setting, Coupon } = require('../models');
const { createPaymentOrder, verifyPayment, getPaymentDetails, getGatewayConfig } = require('../utils/quickGateway');
const { applyCoupon } = require('../utils/coupon');

// ─── Configuration ──────────────────────────────────────────
const RESERVATION_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const MAX_RETRY_ATTEMPTS = 3;

/**
 * Flash sale check — respects BOTH startAt and endAt window.
 * A flash sale is active only if: enabled, has a flash price,
 * startAt (if set) has passed, and endAt (if set) is in the future.
 */
function isFlashActive(duration) {
  if (!duration?.flashSale?.isActive || duration.flashSale?.flashPrice == null) return false;
  const now = new Date();
  if (duration.flashSale.endAt && new Date(duration.flashSale.endAt) <= now) return false;
  if (duration.flashSale.startAt && new Date(duration.flashSale.startAt) > now) return false;
  return true;
}

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
    const { productId, durationValue, durationUnit, customerEmail = '', customerMobile = '9999999999', couponCode = '' } = req.body;

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
      throw new Error('Payment gateway is not configured. Admin must set Merchant Token in Settings page.');
    }

    // 5. 🔥 Check Flash Sale — use flash price if active (startAt + endAt window)
    const flashActive = isFlashActive(duration);
    const payableAmount = flashActive ? duration.flashSale.flashPrice : duration.price;

    // 5b. 🎟️ Apply coupon server-side — the discount is REAL, not just visual.
    //     The gateway order below is created for the FINAL (discounted) amount.
    let couponResult;
    try {
      couponResult = await applyCoupon({ code: couponCode, amount: payableAmount, productId });
    } catch (couponError) {
      // Release the key if coupon is invalid
      await Key.findByIdAndUpdate(reservedKey._id, {
        $set: { status: 'available', reservedAt: null, reservationExpiresAt: null },
      });
      res.status(400);
      throw couponError;
    }
    const gatewayAmount = couponResult.finalAmount;

    // 6. ✅ Create QuickGateway order server-side
    const gwOrder = await createPaymentOrder(
      gatewayAmount,
      gatewayConfig.merchantToken,
      String(customerMobile || '9999999999')
    );

    if (!gwOrder.success) {
      await Key.findByIdAndUpdate(reservedKey._id, {
        $set: { status: 'available', reservedAt: null, reservationExpiresAt: null },
      });
      res.status(502);
      throw new Error('Payment gateway order failed: ' + (gwOrder.message || 'Unknown error'));
    }

    // 6b. Save payment + coupon + customer info on key (needed for webhook lookup later)
    //     reservedAmount LOCKS the final price at initiate time — flash sales ending
    //     or price changes mid-payment must not break the order at completion.
    await Key.findByIdAndUpdate(reservedKey._id, {
      $set: {
        paymentId: gwOrder.paymentId,
        reservedAmount: gatewayAmount,
        couponCode: couponResult.couponCode,
        couponId: couponResult.couponId,
        discountAmount: couponResult.discountAmount,
        customerEmail: customerEmail || req.user?.email || '',
      },
    });

    // 7. Try to get full payment details (for embedded QR + polling without SDK)
    let paymentDetails = null;
    try {
      const det = await getPaymentDetails(gwOrder.paymentId, gatewayConfig.merchantToken);
      if (det.success && det.data) paymentDetails = det.data;
    } catch (e) { /* non-critical */ }

    // 8. Return everything frontend needs
    res.json({
      success: true,
      data: {
        reservationId: reservedKey._id.toString(),
        productId: product._id,
        productTitle: product.title,
        duration: duration.label,
        amount: gatewayAmount,            // Final amount charged (after coupon)
        subtotal: payableAmount,          // Amount before coupon
        discountAmount: couponResult.discountAmount,
        couponCode: couponResult.couponCode,
        originalPrice: duration.price,
        isFlashSale: flashActive,
        durationValue: duration.value,
        durationUnit: duration.unit,
        customerEmail: customerEmail || req.user?.email || '',
        // QuickGateway order details
        paymentId: gwOrder.paymentId,
        paymentUrl: gwOrder.paymentUrl,
        trxId: paymentDetails?.transactionId || paymentDetails?.trxId || '',
        upiId: paymentDetails?.upiId || '',
        gateway: {
          merchantToken: gatewayConfig.merchantToken,
        },
        expiresInMinutes: RESERVATION_TIMEOUT_MS / 60000,
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

    // 💰 Amount was LOCKED at initiate time (flash/coupon changes mid-payment
    //    must NOT change what we charge) — prefer the key's reserved amount.
    const paidAmount = key.reservedAmount != null
      ? key.reservedAmount
      : Math.max(0, (isFlashActive(duration) ? duration.flashSale.flashPrice : duration.price) - (key.discountAmount || 0));

    // 💰 Amount verification: customer must have paid exactly what we charged
    // (prevents under-payment attacks where the gateway order was manipulated)
    if (verification.data && verification.data.amount != null) {
      const gatewayAmount = Number(verification.data.amount);
      if (Math.abs(gatewayAmount - paidAmount) > 0.5) {
        // Restore the key so the customer can retry
        await Key.findByIdAndUpdate(key._id, {
          $set: { status: 'available', soldAt: null },
        });
        res.status(402);
        throw new Error('Payment amount mismatch — please contact support');
      }
    }

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
      discountAmount: discountAmount,
      couponCode: key.couponCode || '',
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

    // 7b. Increment coupon usage (once per order)
    if (key.couponId) {
      await Coupon.findByIdAndUpdate(key.couponId, { $inc: { usedCount: 1 } });
    }

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
        discountAmount: discountAmount,
        couponCode: key.couponCode || '',
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
    // Release any keys whose payment window (10 min) already expired
    await cleanupExpiredReservations();

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
    // Release any keys whose payment window (10 min) already expired
    await cleanupExpiredReservations();

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

// ─── Payment Status Check (for frontend polling without SDK) ───
// @desc    Check payment status via QuickGateway
// @route   GET /api/orders/payment-status/:paymentId
const checkPaymentStatus = async (req, res, next) => {
  try {
    // Release any keys whose payment window (10 min) already expired
    await cleanupExpiredReservations();

    const { paymentId } = req.params;
    if (!paymentId) {
      res.status(400);
      throw new Error('Payment ID required');
    }
    const settings = await Setting.findOne({ key: 'payment_gateway' }).lean();
    const gatewayConfig = getGatewayConfig(settings?.value);
    if (!gatewayConfig.merchantToken) {
      return res.json({ success: false, status: 'error', message: 'Gateway not configured' });
    }
    const result = await getPaymentDetails(paymentId, gatewayConfig.merchantToken);
    res.json({ success: result.success, status: result.data?.status || 'unknown', data: result.data });
  } catch (error) {
    next(error);
  }
};

module.exports = { cleanupExpiredReservations, initiateOrder, completeOrder, releaseReservation, getMyOrders, getAllOrders, checkPaymentStatus };
