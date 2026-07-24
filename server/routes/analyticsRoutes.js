const express = require('express');
const router = express.Router();
const { getSummary, getSalesChart, getTopMods } = require('../controllers/analyticsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/summary', protect, adminOnly, getSummary);
router.get('/sales-chart', protect, adminOnly, getSalesChart);
router.get('/top-mods', protect, adminOnly, getTopMods);

module.exports = router;
