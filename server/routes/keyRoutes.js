const express = require('express');
const router = express.Router();
const { getKeys, addKeys, deleteKey, getKeyStats, clearExpiredReservations } = require('../controllers/keyController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getKeyStats);
router.post('/clear-expired', protect, adminOnly, clearExpiredReservations);
router.get('/:productId', protect, adminOnly, getKeys);
router.post('/add', protect, adminOnly, addKeys);
router.delete('/:id', protect, adminOnly, deleteKey);

module.exports = router;