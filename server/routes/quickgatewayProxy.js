/**
 * QuickGateway API Proxy
 * ======================
 * Proxies SDK API calls through the backend to avoid CORS issues.
 * The SDK runs in the browser and makes fetch() calls to the gateway.
 * If the gateway's CORS doesn't allow the website's origin, the calls fail.
 * 
 * This proxy forwards SDK requests through the backend (same-origin, no CORS).
 * 
 * Mount at: /api/quickgateway-proxy
 * 
 * SDK config:
 *   window.QuickGatewayConfig = { apiBase: '/api/quickgateway-proxy' };
 * 
 * Supported endpoints:
 *   POST /api/quickgateway-proxy/create-order         → POST https://api.quickgateway.in/api/create-order
 *   GET  /api/quickgateway-proxy/payment/details/:id  → GET  https://api.quickgateway.in/api/payment/details/:id
 *   POST /api/quickgateway-proxy/payment/verify       → POST https://api.quickgateway.in/api/payment/verify
 *   POST /api/quickgateway-proxy/payment/set-amount/:id → POST https://api.quickgateway.in/api/payment/set-amount/:id
 */

const express = require('express');
const https = require('https');
const http = require('http');
const router = express.Router();

// Target gateway URL
const GATEWAY_BASE = process.env.QUICKGATEWAY_API_URL || 'https://api.quickgateway.in';
const GATEWAY_PATH = '/api';

/**
 * Forward an incoming request to the QuickGateway server
 */
function forwardRequest(method, path, body, res) {
  const url = new URL(GATEWAY_BASE);
  const fullPath = GATEWAY_PATH + path;
  const isSecure = url.protocol === 'https:';
  const mod = isSecure ? https : http;

  const options = {
    hostname: url.hostname,
    port: isSecure ? 443 : 80,
    path: fullPath,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 15000,
  };

  const proxyReq = mod.request(options, (proxyRes) => {
    let data = '';
    proxyRes.on('data', (chunk) => { data += chunk; });
    proxyRes.on('end', () => {
      // Forward status code
      res.status(proxyRes.statusCode);
      
      // Try to parse as JSON, otherwise send raw
      try {
        const parsed = JSON.parse(data);
        res.json(parsed);
      } catch {
        res.send(data);
      }
    });
  });

  proxyReq.on('error', (err) => {
    console.error('[QuickGateway Proxy] Error:', err.message);
    res.status(502).json({ status: 'FAILED', message: 'Gateway proxy error: ' + err.message });
  });

  proxyReq.on('timeout', () => {
    proxyReq.destroy();
    res.status(504).json({ status: 'FAILED', message: 'Gateway proxy timeout' });
  });

  if (body) {
    proxyReq.write(JSON.stringify(body));
  }
  proxyReq.end();
}

// ─── Routes ─────────────────────────────────────────────────────────────

/**
 * POST /api/quickgateway-proxy/create-order
 * Forward order creation to QuickGateway
 */
router.post('/create-order', (req, res) => {
  forwardRequest('POST', '/create-order', req.body, res);
});

/**
 * GET /api/quickgateway-proxy/payment/details/:paymentId
 * Forward payment details request
 */
router.get('/payment/details/:paymentId', (req, res) => {
  forwardRequest('GET', `/payment/details/${encodeURIComponent(req.params.paymentId)}`, null, res);
});

/**
 * POST /api/quickgateway-proxy/payment/verify
 * Forward payment verification
 */
router.post('/payment/verify', (req, res) => {
  forwardRequest('POST', '/payment/verify', req.body, res);
});

/**
 * POST /api/quickgateway-proxy/payment/set-amount/:paymentId
 * Forward custom amount setting
 */
router.post('/payment/set-amount/:paymentId', (req, res) => {
  forwardRequest('POST', `/payment/set-amount/${encodeURIComponent(req.params.paymentId)}`, req.body, res);
});

module.exports = router;
