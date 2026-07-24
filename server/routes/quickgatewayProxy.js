/**
 * QUICKGATEWAY API PROXY
 * =======================
 * 
 * Forwards payment API calls from the frontend to QuickGateway.
 * This avoids CORS issues — browsers can call same-origin /api/quickgateway-proxy/*
 * and this server forwards to https://quickgateway.in/api/*
 *
 * ─── ENDPOINTS ────────────────────────────────────────────────
 * 
 * POST /api/quickgateway-proxy/create-order
 *   → POST https://quickgateway.in/api/create-order
 *   Body: { user_token, customer_mobile, amount, [redirect_url], [order_id], [remark_1], [remark_2] }
 *   Response: { status: "SUCCESS"|"FAILED", success: boolean, message: string, result?: {...} }
 * 
 * GET /api/quickgateway-proxy/payment/details/:paymentId
 *   → GET https://quickgateway.in/api/payment/details/:paymentId
 *   Headers: Authorization: Bearer <merchantToken>
 *   Response: { status: "SUCCESS"|"FAILED", result?: {...} }
 * 
 * POST /api/quickgateway-proxy/payment/verify
 *   → POST https://quickgateway.in/api/payment/verify
 *   Body: { trxId: "..." }
 *   Response: PLAIN TEXT "SUCCESS"|"FAILURE"|"PENDING"|"ALREADY"|"NOT_FOUND"
 * 
 * POST /api/quickgateway-proxy/payment/set-amount/:paymentId
 *   → POST https://quickgateway.in/api/payment/set-amount/:paymentId
 *   Body: { amount: number }
 *   Response: { status: "SUCCESS"|"FAILED", message: string, result?: { amount } }
 */

const express = require('express');
const https = require('https');
const { getGatewayConfig } = require('../utils/quickGateway');
const { Setting } = require('../models');

const router = express.Router();

const GATEWAY_API = (process.env.QUICKGATEWAY_API_URL || 'https://api.quickgateway.in').replace(/\/+$/, '') + '/api';

// ─── Helpers ─────────────────────────────────────────────────

/** Get merchant token from DB settings */
async function getMerchantToken() {
  const settings = await Setting.findOne({ key: 'payment_gateway' }).lean();
  const config = getGatewayConfig(settings?.value);
  return config.merchantToken;
}

/** Make HTTPS request to gateway */
function proxyRequest(method, path, body = null, merchantToken = '') {
  return new Promise((resolve, reject) => {
    const url = new URL(GATEWAY_API + path);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 20000,
    };

    if (merchantToken) {
      options.headers['Authorization'] = 'Bearer ' + merchantToken;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Try JSON first, fallback to plain text (verify returns plain text)
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data), raw: data });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: data, raw: data });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Gateway timeout')); });

    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// ─── Routes ───────────────────────────────────────────────────

/** POST /create-order — create payment order */
router.post('/create-order', async (req, res) => {
  try {
    const token = await getMerchantToken();
    if (!token) {
      return res.status(400).json({ status: 'FAILED', success: false, message: 'Merchant token not configured' });
    }

    const { user_token, customer_mobile, amount, redirect_url, order_id, remark_1, remark_2 } = req.body;

    const gwRes = await proxyRequest('POST', '/create-order', {
      user_token: token,
      customer_mobile: customer_mobile || '9999999999',
      amount: Math.max(1, Number(amount) || 0),
      ...(redirect_url && { redirect_url }),
      ...(order_id && { order_id }),
      ...(remark_1 && { remark_1 }),
      ...(remark_2 && { remark_2 }),
    });

    res.status(gwRes.status).json(gwRes.data);
  } catch (err) {
    res.status(502).json({ status: 'FAILED', success: false, message: err.message });
  }
});

/** GET /payment/details/:paymentId — get payment details */
router.get('/payment/details/:paymentId', async (req, res) => {
  try {
    const token = await getMerchantToken();
    if (!token) {
      return res.status(400).json({ status: 'FAILED', message: 'Merchant token not configured' });
    }

    const gwRes = await proxyRequest('GET', `/payment/details/${encodeURIComponent(req.params.paymentId)}`, null, token);
    res.status(gwRes.status).json(gwRes.data);
  } catch (err) {
    res.status(502).json({ status: 'FAILED', message: err.message });
  }
});

/** POST /payment/verify — verify payment status (plain text response) */
router.post('/payment/verify', async (req, res) => {
  try {
    const { trxId } = req.body;
    if (!trxId) {
      return res.status(400).send('FAILED');
    }

    const gwRes = await proxyRequest('POST', '/payment/verify', { trxId });
    // Pass through plain text
    res.status(gwRes.status).send(typeof gwRes.data === 'string' ? gwRes.data : 'FAILURE');
  } catch (err) {
    res.status(502).send('FAILURE');
  }
});

/** POST /payment/set-amount/:paymentId — set custom amount */
router.post('/payment/set-amount/:paymentId', async (req, res) => {
  try {
    const token = await getMerchantToken();
    if (!token) {
      return res.status(400).json({ status: 'FAILED', message: 'Merchant token not configured' });
    }

    const gwRes = await proxyRequest('POST', `/payment/set-amount/${encodeURIComponent(req.params.paymentId)}`, {
      amount: req.body.amount,
    });

    res.status(gwRes.status).json(gwRes.data);
  } catch (err) {
    res.status(502).json({ status: 'FAILED', message: err.message });
  }
});

module.exports = router;
