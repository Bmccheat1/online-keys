/**
 * QuickGateway Payment Integration Service
 * 
 * Based on official PHP Module API:
 *   POST /api/create-order             — Create payment order
 *   POST /api/check-order-status       — Check order status (by order_id)
 *   POST /api/payment/verify           — Verify payment (by trxId, returns plain text)
 *   GET  /api/payment/details/{id}     — Get payment details (by paymentId)
 * 
 * SDK: https://api.quickgateway.in/sdk/quickgateway.js
 * 
 * Flow (embedded mode):
 * 1. Backend initiateOrder → reserves key → returns merchantToken + amount
 * 2. Frontend QG.checkout({ amount, userToken, onSuccess, onFailure })
 *    → SDK creates order ON QUICKGATEWAY SERVER
 *    → SDK shows embedded bottom sheet with QR code
 *    → SDK polls status → onSuccess(pd) with paymentId
 * 3. Frontend calls completeOrder(paymentId)
 * 4. Backend server-to-server verifies via QuickGateway API → delivers key
 */

const https = require('https');
const env = require('../config/env');

const QUICKGATEWAY_BASE = process.env.QUICKGATEWAY_API_URL || 'https://api.quickgateway.in';
const API_PATH = '/api';

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
        'Accept': 'application/json',
        ...options.headers,
      },
      timeout: 15000,
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Try JSON first
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          // Return raw text (verifyPayment returns plain text)
          resolve({ status: res.statusCode, data: data, raw: data });
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
 * Create a payment order on QuickGateway (server-to-server)
 * POST https://api.quickgateway.in/api/create-order
 * 
 * @param {number} amount - Amount in INR
 * @param {string} merchantToken - API token
 * @param {string} customerMobile - Customer's 10+ digit mobile (required by API)
 * @param {object} options - Optional: order_id, redirect_url, remark_1, remark_2
 * @returns {Promise<{success: boolean, paymentId?: string, paymentUrl?: string, ...}>}
 */
async function createPaymentOrder(amount, merchantToken, customerMobile = '9999999999', options = {}) {
  try {
    const payload = {
      user_token: merchantToken,
      customer_mobile: customerMobile,
      amount: Math.round(amount * 100) / 100, // ensure 2 decimal places
    };

    if (options.orderId) payload.order_id = options.orderId;
    if (options.redirectUrl) payload.redirect_url = options.redirectUrl;
    if (options.remark1) payload.remark_1 = options.remark1;
    if (options.remark2) payload.remark_2 = options.remark2;

    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}${API_PATH}/create-order`,
      { method: 'POST' },
      payload
    );

    const data = response.data || {};
    const result = data.result || data;
    const status = (result.status || '').toUpperCase();
    const paymentId = result.paymentId || result.id || '';
    const paymentUrl = result.payment_url || result.paymentUrl || '';

    const isHttpOk = response.status >= 200 && response.status < 300;

    if (isHttpOk && status !== 'FAILED' && (status !== '' || paymentId)) {
      return {
        success: true,
        paymentId,
        paymentUrl,
        qrData: result.qrData || result.qr || '',
        amount: result.amount || amount,
        orderId: result.order_id || result.orderId || options.orderId || '',
      };
    }

    const errMsg = result.message || result.msg || data.message || '';
    return {
      success: false,
      message: errMsg || `Gateway responded with status: ${result.status || response.status}`,
    };
  } catch (error) {
    console.error('❌ QuickGateway createOrder error:', error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Get payment details by paymentId
 * GET https://api.quickgateway.in/api/payment/details/{paymentId}
 * 
 * @param {string} paymentId - Payment ID to look up
 * @param {string} merchantToken - API token
 * @returns {Promise<{success: boolean, data?: object}>}
 */
async function getPaymentDetails(paymentId, merchantToken) {
  try {
    if (!paymentId) {
      return { success: false, data: { status: 'error', message: 'paymentId is required' } };
    }

    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}${API_PATH}/payment/details/${encodeURIComponent(paymentId)}`,
      {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + merchantToken },
      }
    );

    const data = response.data || {};
    const result = data.result || data;

    // Check if 404 (not found)
    if (response.status === 404) {
      return { success: false, data: { status: 'not_found', message: 'Payment not found' } };
    }

    // Check status
    const paymentStatus = (result.status || '').toUpperCase();
    const isSuccess = ['SUCCESS', 'COMPLETED', 'PAID', 'ORDER_CREATED'].includes(paymentStatus);

    return {
      success: isSuccess,
      data: {
        paymentId: result.paymentId || paymentId,
        orderId: result.order_id || result.orderId || '',
        amount: result.amount,
        transactionId: result.transactionId || result.txnId || result.trxId || '',
        status: isSuccess ? 'completed' : (paymentStatus || 'pending'),
        message: result.message || '',
        payerInfo: result.payerInfo || result.payer || {},
      },
    };
  } catch (error) {
    console.error('❌ QuickGateway getPaymentDetails error:', error.message);
    return { success: false, data: { status: 'error', message: error.message } };
  }
}

/**
 * Verify payment status with QuickGateway
 * Tries multiple endpoints to verify payment:
 * 1. getPaymentDetails(paymentId) — GET /payment/details/{id}
 * 2. If that fails, try /check-order-status (if we have orderId)
 * 
 * @param {string} paymentId - Payment ID to verify
 * @param {string} merchantToken - API token
 * @returns {Promise<{success: boolean, data: object}>}
 */
async function verifyPayment(paymentId, merchantToken) {
  // Step 1: Try getPaymentDetails (GET /api/payment/details/{paymentId})
  const details = await getPaymentDetails(paymentId, merchantToken);
  if (details.success) {
    return details;
  }

  // Step 2: If payment not found by ID, try /check-order-status
  // This endpoint uses order_id, which might be the paymentId
  try {
    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}${API_PATH}/check-order-status`,
      { method: 'POST' },
      {
        user_token: merchantToken,
        order_id: paymentId,
      }
    );

    const data = response.data || {};
    const result = data.result || data;
    const status = (data.status || result.status || '').toUpperCase();

    if (status === 'FAILED' || response.status === 404) {
      return { success: false, data: { status: 'not_found', message: 'Payment not verified' } };
    }

    const isSuccess = ['SUCCESS', 'COMPLETED', 'PAID'].includes(status);
    return {
      success: isSuccess,
      data: {
        paymentId: result.paymentId || paymentId,
        orderId: result.order_id || paymentId,
        amount: result.amount,
        transactionId: result.transactionId || result.txnId || '',
        status: isSuccess ? 'completed' : (status || 'pending'),
        message: result.message || '',
      },
    };
  } catch (error) {
    console.error('❌ QuickGateway verifyPayment (fallback) error:', error.message);
    return { success: false, data: { status: 'error', message: error.message } };
  }
}

/**
 * Get merchant token — ENV var OVERRIDES DB settings
 * @param {object} gatewayValue - payment_gateway setting from DB
 * @returns {string}
 */
function getMerchantToken(gatewayValue) {
  if (env.quickgatewayMerchantToken) return env.quickgatewayMerchantToken;
  return gatewayValue?.apiKey || '';
}

/**
 * Get gateway config — ENV var OVERRIDES DB settings
 * @param {object} gatewayValue
 * @returns {object}
 */
function getGatewayConfig(gatewayValue) {
  const config = gatewayValue || {};
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
  getPaymentDetails,
  getMerchantToken,
  getGatewayConfig,
  QUICKGATEWAY_BASE,
};
