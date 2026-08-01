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
 * 
 * 🔒 SECURITY: The signature is verified (HMAC-SHA256) before anything is
 * processed. The webhook secret comes from:
 *   1. WEBHOOK_SECRET environment variable, or
 *   2. the `webhook_secret` setting (Admin → Settings page), or
 *   3. the gateway merchant token as a last-resort fallback.
 * If no secret is configured at all, the webhook FAILS CLOSED (401) so
 * nobody can forge payment-success events and steal keys.
 */

const crypto = require('crypto');
const { Order, Key, Product, Setting, Coupon } = require('../models');
const { verifyPayment, getGatewayConfig } = require('../utils/quickGateway');

/** Constant-time string comparison (prevents timing attacks) */
function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/**
 * Verify the HMAC-SHA256 webhook signature.
 * Tries the common canonical strings: nonce+timestamp+body, timestamp+nonce+body, raw body.
 * Accepts both hex and base64 encoded signatures.
 */
function verifySignature(req, secret) {
  const signature = req.headers['x-webhook-signature'];
  if (!signature) return false;
  const nonce = req.headers['x-webhook-nonce'] || '';
  const timestamp = req.headers['x-webhook-timestamp'] || '';
  const body = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body || {});

  const candidates = [`${nonce}${timestamp}${body}`, `${timestamp}${nonce}${body}`, body];
  return candidates.some((msg) => {
    const hex = crypto.createHmac('sha256', secret).update(msg).digest('hex');
    const base64 = crypto.createHmac('sha256', secret).update(msg).digest('base64');
    return safeEqual(signature, hex) || safeEqual(signature, base64);
  });
}

/** Flash sale check — respects BOTH startAt and endAt window */
function isFlashActive(duration) {
  if (!duration?.flashSale?.isActive || duration.flashSale?.flashPrice == null) return false;
  const now = new Date();
  if (duration.flashSale.endAt && new Date(duration.flashSale.endAt) <= now) return false;
  if (duration.flashSale.startAt && new Date(duration.flashSale.startAt) > now) return false;
  return true;
}

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

    // ─── 0. 🔒 Verify signature — FAIL CLOSED ─────────────────
    const webhookSetting = await Setting.findOne({ key: 'webhook_secret' }).lean();
    const gatewaySetting = await Setting.findOne({ key: 'payment_gateway' }).lean();
    const gatewayConfig = getGatewayConfig(gatewaySetting?.value);
    const webhookSecret =
      (process.env.WEBHOOK_SECRET || '').trim() ||
      (webhookSetting?.value && String(webhookSetting.value).trim()) ||
      gatewayConfig.merchantToken;

    if (!webhookSecret) {
      console.log('[Webhook] ❌ No webhook secret configured — rejecting (fail closed)');
      return res.status(401).json({
        success: false,
        message: 'Webhook secret not configured. Set WEBHOOK_SECRET or webhook_secret setting.',
      });
    }

    if (!verifySignature(req, webhookSecret)) {
      console.log('[Webhook] ❌ Invalid signature — rejecting');
      return res.status(401).json({ success: false, message: 'Invalid webhook signature' });
    }

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
      // 1. Verify payment with QuickGateway API (server-to-server)
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

      // 3. Create order — flash sale + coupon were locked at initiate time
      const product = key.productId;
      const duration = product?.durations?.find(
        (d) => d.value === durationValue && d.unit === durationUnit
      );

      const flashActive = isFlashActive(duration);
      const baseAmount = flashActive ? duration.flashSale.flashPrice : (duration?.price || amount);
      const discountAmount = key.discountAmount || 0;
      const paidAmount = Math.max(0, baseAmount - discountAmount);

      const order = await Order.create({
        userId: null,
        customerEmail: key.customerEmail || '',
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
        discountAmount: discountAmount,
        couponCode: key.couponCode || '',
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

      // 6. Increment coupon usage (once per order)
      if (key.couponId) {
        await Coupon.findByIdAndUpdate(key.couponId, { $inc: { usedCount: 1 } });
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
      // Release the key back to available pool (and clear coupon info)
      key.status = 'available';
      key.paymentId = null;
      key.reservedAt = null;
      key.reservationExpiresAt = null;
      key.couponCode = null;
      key.couponId = null;
      key.discountAmount = 0;
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
