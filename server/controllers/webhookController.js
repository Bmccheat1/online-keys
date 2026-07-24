/**
 * WEBHOOK CONTROLLER
 * ==================
 * 
 * QuickGateway sends a POST request to this endpoint when a payment
 * is completed/failed. This server then processes the order automatically
 * without needing the customer's browser to be open.
 * 
 * Webhook URL (set in QuickGateway Dashboard → Settings → Callback URL):
 *   https://YOUR_DOMAIN.com/api/webhooks/quickgateway
 * 
 * Gateway sends:
 *   POST with JSON body: { trxId, paymentId, amount, status, utr, method, ... }
 *   Headers: X-Webhook-Signature, X-Webhook-Nonce, X-Webhook-Timestamp
 */

const { Order, Key, Product, Setting } = require('../models');
const { createPaymentOrder, verifyPayment, getPaymentDetails, getGatewayConfig } = require('../utils/quickGateway');

/**
 * POST /api/webhooks/quickgateway
 * Called by QuickGateway when payment status changes
 */
const quickgatewayWebhook = async (req, res) => {
  try {
    const body = req.body;
    const paymentId = body.paymentId || body.payment_id || '';
    const trxId = body.trxId || body.trx_id || '';
    const status = (body.status || '').toUpperCase();
    const utr = body.utr || '';
    const method = body.method || '';
    const amount = Number(body.amount) || 0;

    console.log(`[Webhook] Received: paymentId=${paymentId}, status=${status}, trxId=${trxId}`);

    // ─── Validate ────────────────────────────────────────────
    if (!paymentId) {
      console.log('[Webhook] Missing paymentId');
      return res.status(400).json({ success: false, message: 'Missing paymentId' });
    }

    // ─── Find the reserved key by paymentId ──────────────────
    const key = await Key.findOne({ paymentId }).populate('productId');
    if (!key) {
      console.log(`[Webhook] No key found for paymentId=${paymentId}`);
      // Could be a payment that wasn't initiated through our system
      return res.status(200).json({ success: false, message: 'Unknown paymentId' });
    }

    const productId = key.productId?._id || key.productId;
    const durationValue = key.durationValue;
    const durationUnit = key.durationUnit;

    // ─── Check if already processed ──────────────────────────
    const existingOrder = await Order.findOne({ paymentId }).lean();
    if (existingOrder) {
      console.log(`[Webhook] Payment ${paymentId} already processed (order ${existingOrder._id})`);
      return res.status(200).json({ success: true, message: 'Already processed' });
    }

    // ─── Payment Success Flow ────────────────────────────────
    if (status === 'SUCCESS' || status === 'CAPTURED') {
      // 1. Verify payment with QuickGateway API
      const settings = await Setting.findOne({ key: 'payment_gateway' }).lean();
      const gatewayConfig = getGatewayConfig(settings?.value);

      if (!gatewayConfig.merchantToken) {
        console.log('[Webhook] Gateway not configured');
        return res.status(200).json({ success: false, message: 'Gateway not configured' });
      }

      const verification = await verifyPayment(paymentId, gatewayConfig.merchantToken);
      if (!verification.success) {
        console.log(`[Webhook] Payment verification FAILED for ${paymentId}`);
        // Don't mark as failed yet — could be temporary
        return res.status(200).json({ success: false, message: 'Verification failed' });
      }

      // 2. Mark key as sold
      key.status = 'sold';
      key.soldAt = new Date();
      key.reservedAt = null;
      key.reservationExpiresAt = null;

      // 3. Create order
      const product = key.productId;
      const duration = product?.durations?.find(
        (d) => d.value === durationValue && d.unit === durationUnit
      );

      // Flash sale check
      const isFlashActive = duration?.flashSale?.isActive &&
        duration.flashSale?.flashPrice != null &&
        duration.flashSale?.endAt &&
        new Date(duration.flashSale.endAt) > new Date();
      const paidAmount = isFlashActive ? duration.flashSale.flashPrice : (duration?.price || amount);

      const order = await Order.create({
        userId: null,
        customerEmail: '',
        items: [{
          productId: productId,
          keyId: key._id,
          selectedDuration: {
            label: duration?.label || `${durationValue} ${durationUnit}`,
            value: durationValue,
            unit: durationUnit,
            price: paidAmount,
            originalPrice: duration?.price || paidAmount,
          },
        }],
        totalAmount: paidAmount,
        paymentId: paymentId,
        paymentStatus: 'completed',
        orderStatus: 'completed',
      });

      // 4. Link order to key
      key.orderId = order._id;
      await key.save();

      // 5. Update product sold count
      if (productId) {
        await Product.findByIdAndUpdate(productId, { $inc: { soldKeys: 1 } });
      }

      console.log(`[Webhook] ✅ Order ${order._id} completed via webhook for payment ${paymentId}`);
      return res.status(200).json({
        success: true,
        message: 'Order completed',
        data: { orderId: order._id },
      });
    }

    // ─── Payment Failed Flow ─────────────────────────────────
    if (status === 'FAILED' || status === 'FAILURE' || status === 'EXPIRED' || status === 'REVERSED') {
      // Release the key back to available pool
      key.status = 'available';
      key.paymentId = null;
      key.reservedAt = null;
      key.reservationExpiresAt = null;
      await key.save();

      console.log(`[Webhook] ${status} for payment ${paymentId} — key released`);
      return res.status(200).json({ success: true, message: 'Key released' });
    }

    // ─── Other statuses (PENDING etc.) — ignore ──────────────
    console.log(`[Webhook] Ignored status=${status} for payment ${paymentId}`);
    return res.status(200).json({ success: true, message: `Status ${status} ignored` });

  } catch (error) {
    console.error('[Webhook] Error:', error.message);
    // Always return 200 to prevent gateway from retrying indefinitely
    return res.status(200).json({ success: false, message: error.message });
  }
};

module.exports = { quickgatewayWebhook };
