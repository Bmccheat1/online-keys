/**
 * COUPON HELPER — Shared server-side coupon validation & discount math
 * =====================================================================
 * Used by:
 *  - orderController.initiateOrder  (locks the discounted amount for the gateway order)
 *  - (validateCoupon in couponController remains the public read-only check)
 *
 * IMPORTANT: The discount is applied on the SERVER and the gateway order is
 * created for the FINAL (discounted) amount — the client cannot fake a discount.
 */

const { Coupon } = require('../models');

/**
 * Validate a coupon and compute the discounted amount.
 *
 * @param {object} params
 * @param {string} params.code       Coupon code (case-insensitive)
 * @param {number} params.amount     Amount BEFORE discount (after flash sale)
 * @param {string} [params.productId] Product (mod) the coupon is being used on
 * @returns {Promise<{couponCode: string|null, couponId: string|null, discountAmount: number, finalAmount: number}>}
 * @throws {Error} If the coupon is invalid/expired/not applicable
 */
async function applyCoupon({ code, amount, productId }) {
  // No code → no discount
  if (!code || !String(code).trim()) {
    return { couponCode: null, couponId: null, discountAmount: 0, finalAmount: amount };
  }

  const coupon = await Coupon.findOne({ code: String(code).toUpperCase().trim(), isActive: true });
  if (!coupon) throw new Error('Invalid or expired coupon code');

  // Check expiry
  if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
    throw new Error('Coupon has expired');
  }

  // Check max uses
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    throw new Error('Coupon usage limit reached');
  }

  // Check min amount
  if (amount < coupon.minAmount) {
    throw new Error(`Minimum order amount of ₹${coupon.minAmount.toLocaleString()} required`);
  }

  // Check applicable mod
  if (coupon.applicableModId && productId && String(coupon.applicableModId) !== String(productId)) {
    throw new Error('Coupon not applicable for this mod');
  }

  // Calculate discount
  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = Math.round((amount * coupon.discountValue) / 100);
  } else {
    discountAmount = coupon.discountValue;
  }
  if (discountAmount > amount) discountAmount = amount;

  return {
    couponCode: coupon.code,
    couponId: coupon._id.toString(),
    discountAmount,
    finalAmount: amount - discountAmount,
  };
}

module.exports = { applyCoupon };
