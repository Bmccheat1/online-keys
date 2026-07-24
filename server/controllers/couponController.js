const { Coupon, Product } = require('../models');

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: coupons.length, data: coupons });
  } catch (error) {
    next(error);
  }
};

// @desc    Create coupon (Admin)
// @route   POST /api/coupons
const createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, minAmount, maxUses, expiresAt, applicableModId, description } = req.body;
    if (!code || !discountType || !discountValue) {
      res.status(400);
      throw new Error('Code, discount type, and discount value are required');
    }
    if (discountType === 'percentage' && (discountValue < 1 || discountValue > 100)) {
      res.status(400);
      throw new Error('Percentage discount must be between 1 and 100');
    }
    const exists = await Coupon.findOne({ code: code.toUpperCase() });
    if (exists) {
      res.status(409);
      throw new Error('Coupon code already exists');
    }
    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minAmount: minAmount || 0,
      maxUses: maxUses || null,
      expiresAt: expiresAt || null,
      applicableModId: applicableModId || null,
      description: description || '',
    });
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};

// @desc    Update coupon (Admin)
// @route   PUT /api/coupons/:id
const updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!coupon) {
      res.status(404);
      throw new Error('Coupon not found');
    }
    res.json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
const deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      res.status(404);
      throw new Error('Coupon not found');
    }
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate & apply coupon (Public - used during checkout)
// @route   POST /api/coupons/validate
const validateCoupon = async (req, res, next) => {
  try {
    const { code, amount, productId } = req.body;
    if (!code) {
      res.status(400);
      throw new Error('Coupon code is required');
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      res.status(404);
      throw new Error('Invalid or expired coupon code');
    }

    // Check expiry
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      res.status(400);
      throw new Error('Coupon has expired');
    }

    // Check max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      res.status(400);
      throw new Error('Coupon usage limit reached');
    }

    // Check min amount
    if (amount && amount < coupon.minAmount) {
      res.status(400);
      throw new Error(`Minimum order amount of ₹${coupon.minAmount.toLocaleString()} required`);
    }

    // Check applicable mod
    if (coupon.applicableModId && productId && String(coupon.applicableModId) !== String(productId)) {
      res.status(400);
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

    const finalAmount = amount - discountAmount;

    res.json({
      success: true,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        originalAmount: amount,
        finalAmount,
        description: coupon.description,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon };
