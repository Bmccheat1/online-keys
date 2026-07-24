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

    // Gateway lock is DISABLED — admin panel always works
    // env var is just a fallback default, not a lock
    result._gatewayLocked = false;

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
    // Gateway settings — admin panel always works (env is just fallback)
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