/**
 * QuickGateway Payment Integration Service
 * 
 * API Endpoints:
 *   POST /api/create-order         — Create payment order
 *   POST /api/check-order-status   — Verify payment status
 * 
 * SDK: https://api.quickgateway.in/sdk/quickgateway.js
 * API Base: https://api.quickgateway.in
 * 
 * Flow:
 * 1. Frontend calls QuickGateway.checkout() → SDK creates order → shows bottom sheet
 * 2. User scans QR & pays via UPI
 * 3. SDK polls & returns success
 * 4. Our backend verifies via POST /api/check-order-status → delivers key
 */

const https = require('https');

// Env vars override DB settings — only YOU can change these
const env = require('../config/env');
const QUICKGATEWAY_BASE = process.env.QUICKGATEWAY_API_URL || 'https://api.quickgateway.in';

/**
 * Make HTTPS request (no axios needed)
 */
function httpsRequest(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      timeout: 15000,
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, data: { raw: data } });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

/**
 * Create a payment order on QuickGateway
 * POST https://api.quickgateway.in/api/create-order
 * 
 * @param {number} amount - Amount in INR
 * @param {string} merchantToken - Your API token from dashboard
 * @returns {Promise<{success: boolean, paymentId?: string, qrData?: string, paymentUrl?: string}>}
 */
async function createPaymentOrder(amount, merchantToken) {
  try {
    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}/api/create-order`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${merchantToken}`,
        },
      },
      {
        amount: amount,
        userToken: merchantToken,
      }
    );

    if (response.status === 200 && response.data.status === 'success') {
      return {
        success: true,
        paymentId: response.data.paymentId,
        qrData: response.data.qrData || response.data.qr,
        paymentUrl: response.data.paymentUrl,
        amount: response.data.amount || amount,
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to create payment order',
    };
  } catch (error) {
    console.error('❌ QuickGateway createOrder error:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Verify payment status with QuickGateway
 * POST https://api.quickgateway.in/api/check-order-status
 * 
 * @param {string} paymentId - Payment ID to verify
 * @param {string} merchantToken - Your API token from dashboard
 * @returns {Promise<{success: boolean, data: object}>}
 */
async function verifyPayment(paymentId, merchantToken) {
  try {
    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}/api/check-order-status`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${merchantToken}`,
        },
      },
      {
        paymentId: paymentId,
        userToken: merchantToken,
      }
    );

    const data = response.data;

    if (response.status === 200 && 
        (data.status === 'success' || data.status === 'completed' || data.status === 'paid')) {
      return {
        success: true,
        data: {
          paymentId: data.paymentId || paymentId,
          amount: data.amount,
          status: 'completed',
          transactionId: data.transactionId || data.txnId || '',
          payerInfo: data.payerInfo || data.payer || {},
        },
      };
    }

    return {
      success: false,
      data: {
        paymentId,
        status: data.status || 'pending',
        message: data.message || 'Payment not yet completed',
      },
    };
  } catch (error) {
    console.error('❌ QuickGateway verifyPayment error:', error.message);
    return {
      success: false,
      data: {
        paymentId,
        status: 'error',
        message: error.message || 'Verification request failed',
      },
    };
  }
}

/**
 * Get merchant token — ENV var OVERRIDES DB settings
 * @param {object} gatewayValue - payment_gateway setting from DB
 * @returns {string}
 */
function getMerchantToken(gatewayValue) {
  // Step 1: If env var is set → use it (YOU control this)
  if (env.quickgatewayMerchantToken) return env.quickgatewayMerchantToken;
  // Step 2: Fall back to DB (if no env var)
  return gatewayValue?.apiKey || '';
}

/**
 * Get gateway config — ENV var OVERRIDES DB settings
 * @param {object} gatewayValue
 * @returns {object}
 */
function getGatewayConfig(gatewayValue) {
  const config = gatewayValue || {};
  // If env var is set → ignore DB settings completely (only YOU can change)
  const merchantToken = env.quickgatewayMerchantToken || config.apiKey || '';
  return {
    gatewayName: 'quickgateway',
    apiUrl: QUICKGATEWAY_BASE,
    apiKey: merchantToken,
    isActive: merchantToken ? true : (config.isActive !== false),
    merchantToken: merchantToken,
    _source: env.quickgatewayMerchantToken ? 'environment' : 'database',
  };
}

module.exports = {
  createPaymentOrder,
  verifyPayment,
  getMerchantToken,
  getGatewayConfig,
  QUICKGATEWAY_BASE,
};
