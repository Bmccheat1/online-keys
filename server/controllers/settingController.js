const { Setting } = require('../models');
const env = require('../config/env');

// @desc    Get all settings (Admin)
// @route   GET /api/settings
const getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.find().lean();
    
    // Convert to key-value object
    const result = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    // Add gateway lock status (env var > DB)
    result._gatewayLocked = !!(env.quickgatewayMerchantToken);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single setting by key
// @route   GET /api/settings/:key
const getSetting = async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key }).lean();
    if (!setting) {
      res.status(404);
      throw new Error('Setting not found');
    }
    res.json({ success: true, data: setting.value });
  } catch (error) {
    next(error);
  }
};

// @desc    Update/create setting (Admin)
// @route   PUT /api/settings/:key
const updateSetting = async (req, res, next) => {
  try {
    // 🔒 Gateway settings locked when env var is set — only YOU can change
    if (req.params.key === 'payment_gateway' && env.quickgatewayMerchantToken) {
      res.status(403);
      throw new Error('Payment gateway is locked via environment variable (QUICKGATEWAY_MERCHANT_TOKEN). Only the server owner can change it in .env file.');
    }

    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value, description: req.body.description || '' },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, getSetting, updateSetting };