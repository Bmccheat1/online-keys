/**
 * WEBHOOK ROUTES
 * ==============
 * QuickGateway sends payment status updates here.
 * These endpoints do NOT use auth middleware — they are called by
 * the gateway server, not by browsers.
 */
const express = require('express');
const router = express.Router();
const { quickgatewayWebhook } = require('../controllers/webhookController');

// QuickGateway posts payment status updates here
// Set this URL in QuickGateway Dashboard → Settings → Callback URL
router.post('/quickgateway', quickgatewayWebhook);

module.exports = router;
