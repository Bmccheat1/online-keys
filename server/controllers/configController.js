const { Setting } = require('../models');

// @desc    Get public site configuration
// @route   GET /api/config
const getConfig = async (req, res, next) => {
  try {
    const settings = await Setting.find({
      key: { $in: ['site_name', 'site_logo', 'payment_gateway'] }
    }).lean();

    const result = { siteName: 'KeyStore', siteLogo: '' };
    settings.forEach((s) => {
      if (s.key === 'site_name') result.siteName = s.value;
      if (s.key === 'site_logo') result.siteLogo = s.value || '';
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getConfig };
