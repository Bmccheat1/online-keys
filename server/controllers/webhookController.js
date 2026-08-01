/**
 * WEBHOOK CONTROLLER
 * ==================
 * 
 * QuickGateway sends a POST request to this endpoint when a payment
 * is completed/failed. This server then processes the order automatically
 * without needing the customer's browser to be open.
 * 
 * Webhook URL (set in QuickGateway Dashboard → Settings → Callback URL):
 *   https://store.loader-key.com/api/webhooks/quickgateway
 * 
 * Gateway sends:
 *   POST with JSON body: { trxId, paymentId, amount, status, utr, method, ... }
 * 
 * 🔒 SECURITY: No signature/secret verification here — the user chose a plain
 * URL (no secret). That is SAFE because the real trust boundary is the
 * server-to-server `verifyPayment` call against the gateway API below: a
 * forged webhook can never deliver a key, because the gateway itself must
 * confirm the payment actually exists and is paid.
 */

const { Order, Key, Product, Setting, Coupon } = require('../models');
const { verifyPayment, getGatewayConfig } = require('../utils/quickGateway');

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
 * Called by QuickGateway when payment status changes (plain URL, no secret)
 */
const quickgatewayWebhook = async (req, res) => {
  try {
    const body = req.body;
    const paymentId = body.paymentId || body.payment_id || '';
    const trxId = body.trxId || body.trx_id || '';
    const status = String(body.status || body.paymentStatus || '').toUpperCase();
    const utr = body.utr || '';
    const method = body.method || '';
    const amount = Number(body.amount) || 0;

    // Success statuses — defensive: gateway may send text or numeric forms
    const isSuccessStatus = ['SUCCESS', 'CAPTURED', 'PAID', 'COMPLETED', '1'].includes(status);
    const isFailureStatus = ['FAILED', 'FAILURE', 'EXPIRED', 'REVERSED', 'REJECTED', '-1'].includes(status);

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
    if (isSuccessStatus) {
      // 1. Verify payment with QuickGateway API (server-to-server)
      //    — this is the real trust boundary (no signature needed)
      const settings = await Setting.findOne({ key: 'payment_gateway' }).lean();
      const gatewayConfig = getGatewayConfig(settings?.value);
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

      // 3. Create order — amount was LOCKED at initiate time (key.reservedAmount)
      const product = key.productId;
      const duration = product?.durations?.find(
        (d) => d.value === durationValue && d.unit === durationUnit
      );

      // 💰 Prefer the amount locked at initiate (flash/coupon changes must not
      //    break the order); fall back to recompute for legacy reservations.
      const fallbackAmount = duration
        ? (isFlashActive(duration) ? duration.flashSale.flashPrice : duration.price)
        : amount;
      const discountAmount = key.discountAmount || 0;
      const paidAmount = key.reservedAmount != null
        ? key.reservedAmount
        : Math.max(0, fallbackAmount - discountAmount);

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
    if (isFailureStatus) {
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
