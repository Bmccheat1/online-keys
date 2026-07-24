const express = require('express');
const router = express.Router();
const { initiateOrder, completeOrder, releaseReservation, getMyOrders, getAllOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Payment flow with QuickGateway Embedded Checkout (No Redirect)
router.post('/initiate', initiateOrder);        // Step 1: Initiate -> get amount + merchant token for SDK
router.post('/complete', completeOrder);        // Step 2: Complete -> verify payment with QuickGateway + deliver key
router.post('/release', releaseReservation);    // Cancel: release key back to available

router.get('/my', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);

module.exports = router;