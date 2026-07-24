const express = require('express');
const router = express.Router();
const { getSettings, getSetting, updateSetting } = require('../controllers/settingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getSettings);
router.get('/:key', getSetting);
router.put('/:key', protect, adminOnly, updateSetting);

module.exports = router;