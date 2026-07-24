/**
 * QUICKGATEWAY PAYMENT INTEGRATION — Server-Side Reference
 * =========================================================
 * 
 * Base URL: https://api.quickgateway.in/api
 * 
 * ─── ENDPOINTS ─────────────────────────────────────────────────
 * 
 * 1. POST /api/create-order
 *    Create a new payment order.
 *    Request:  { user_token, customer_mobile, amount, [order_id], [redirect_url], [remark_1], [remark_2] }
 *    Success:  { status: "SUCCESS", success: true, message: "ORDER_CREATED", result: { orderId, paymentUrl, paymentId, paymentMode, qrData? } }
 *    Errors:   INVALID_USER_TOKEN | PLAN_EXPIRED_PLEASE_RENEW | MERCHANT_NOT_LINKED | ORDER_ID_ALREADY_EXISTS | ALL_GATEWAYS_DISABLED_BY_ADMIN | Internal server error
 * 
 * 2. POST /api/payment/verify
 *    Verify payment status — returns PLAIN TEXT.
 *    Request:  { trxId: "..." }
 *    Response: "SUCCESS" | "FAILURE" | "PENDING" | "ALREADY" | "NOT_FOUND" | "FAILED"
 * 
 * 3. GET /api/payment/details/:paymentId
 *    Get full payment details.
 *    Headers:  Authorization: Bearer <merchant_token>
 *    Success:  { status: "SUCCESS", result: { paymentId, trxId, amount, status, upiId, merchantName, createdOn, ... } }
 *    Error:    { status: "FAILED", message: "Payment not found" }
 * 
 * 4. POST /api/payment/set-amount/:paymentId
 *    Set amount for custom-amount payments.
 *    Request:  { amount: 100 }
 *    Success:  { status: "SUCCESS", message: "Amount set to ₹100.00", result: { amount: 100 } }
 *    Errors:   PAYMENT_NOT_FOUND | NOT_A_CUSTOM_AMOUNT_PAYMENT | ALREADY_PAID | PAYMENT_EXPIRED | PAYMENT_SESSION_EXPIRED | INVALID_AMOUNT | AMOUNT_EXCEEDS_MAX_LIMIT | AMOUNT_ALREADY_SET
 * 
 * 5. POST /api/check-order-status
 *    Check order status (fallback).
 *    Request:  { user_token, order_id }
 *    Success:  { status: "SUCCESS", ... }
 *    Error:    { status: "FAILED", message: "EITHER_ORDER_ID_IS_WRONG_OR_API_KEY_IS_WRONG" }
 * 
 * 6. Webhook (merchant receives POST to callback URL)
 *    Sent on payment success.
 *    Headers:  X-Webhook-Signature: <hmac-sha256>
 *    Body:     { trxId, paymentId, amount, status, utr, method, remark_1, remark_2, paidOn, createdOn, nonce, timestamp }
 * 
 * ─── PAYMENT STATUS VALUES (from Payment model) ─────────────
 *    0 = Pending (awaiting payment)
 *    1 = Success (payment received)
 *   -1 = Failed/Expired
 * 
 * ─── VERIFY PAYMENT RESPONSES (plain text) ──────────────────
 *    "SUCCESS"  → Payment confirmed, key can be delivered
 *    "FAILURE"  → Payment failed or expired
 *    "PENDING"  → Still awaiting payment confirmation
 *    "ALREADY"  → Payment was already processed earlier
 *    "NOT_FOUND" → No payment record for this transaction ID
 *    "FAILED"   → Generic failure
 * 
 * ─── SDK (Client-Side) ──────────────────────────────────────
 *    URL:   https://quickgateway.in/sdk/quickgateway.js
 *    Config: window.QuickGatewayConfig = { apiBase: 'https://yourdomain.com/api' }
 *    Methods:
 *      QuickGateway.checkout({ amount, userToken, onSuccess, onFailure })
 *      QuickGateway.showCheckout({ paymentId, onSuccess, onFailure })
 *      QuickGateway.mountButton('#selector', { amount, userToken, buttonLabel })
 *      QuickGateway.close()
 * 
 * ─── REACT COMPONENTS (for modern frontends) ────────────────
 *    EmbeddedCheckout — bottom sheet UI (QR code, timer, polling, success/failure)
 *    CheckoutTrigger — "Pay Now" button wrapper
 *    See: client/src/components/checkout/
 */

const https = require('https');
const env = require('../config/env');

// QuickGateway API base — always use /api suffix
//   https://api.quickgateway.in/api
const QUICKGATEWAY_BASE = (process.env.QUICKGATEWAY_API_URL || 'https://api.quickgateway.in').replace(/\/+$/, '') + '/api';

/**
 * Make HTTPS request — no axios needed.
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
      timeout: 20000,
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, raw: data });
        } catch {
          resolve({ status: res.statusCode, data: data, raw: data }); // plain text
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Gateway request timeout')); });

    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// =========================================================================
// 1. CREATE PAYMENT ORDER
// =========================================================================
// POST https://api.quickgateway.in/api/create-order
//
// Response (success):
//   {
//     "status": "SUCCESS",
//     "success": true,
//     "message": "ORDER_CREATED",
//     "result": {
//       "orderId": "TXN...",
//       "order_id": "TXN...",
//       "paymentUrl": "https://checkout.quickgateway.in/payment/...",
//       "payment_url": "https://checkout.quickgateway.in/payment/...",
//       "paymentId": "pay_...",
//       "payment_id": "pay_...",
//       "paymentMode": "auto|url|dynamicQr|embedded",
//       "payment_mode": "auto|url|dynamicQr|embedded",
//       "qrData": "upi://pay?..."  // only when paymentMode supports QR
//     }
//   }
//
// Error responses:
//   { "status": "FAILED", "success": false, "message": "INVALID_USER_TOKEN" }
//   { "status": "FAILED", "success": false, "message": "PLAN_EXPIRED_PLEASE_RENEW" }
//   { "status": "FAILED", "success": false, "message": "MERCHANT_NOT_LINKED" }
//   { "status": "FAILED", "success": false, "message": "ORDER_ID_ALREADY_EXISTS" }
//   { "status": "FAILED", "success": false, "message": "ALL_GATEWAYS_DISABLED_BY_ADMIN" }
// =========================================================================
async function createPaymentOrder(amount, merchantToken, customerMobile = '9999999999', options = {}) {
  try {
    const payload = {
      user_token: merchantToken,
      customer_mobile: customerMobile,
      amount: Math.round(amount * 100) / 100,
    };

    if (options.orderId) payload.order_id = options.orderId;
    if (options.redirectUrl) payload.redirect_url = options.redirectUrl;
    if (options.remark1) payload.remark_1 = options.remark1;
    if (options.remark2) payload.remark_2 = options.remark2;

    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}/create-order`,
      { method: 'POST' },
      payload
    );

    const body = response.data || {};
    const result = body.result || body;

    // Check for gateway-level errors
    if (body.status === 'FAILED' || body.success === false) {
      return {
        success: false,
        message: body.message || result.message || 'Gateway rejected order',
      };
    }

    // Check for HTTP-level errors
    if (response.status >= 400) {
      return {
        success: false,
        message: body.message || `HTTP ${response.status}`,
      };
    }

    const paymentId = result.paymentId || result.id || '';
    if (!paymentId) {
      return { success: false, message: 'No paymentId in gateway response' };
    }

    return {
      success: true,
      paymentId: paymentId,
      paymentUrl: result.paymentUrl || result.payment_url || '',
      qrData: result.qrData || result.qr_data || '',
      amount: result.amount || amount,
      orderId: result.orderId || result.order_id || options.orderId || '',
      paymentMode: result.paymentMode || result.payment_mode || 'url',
    };
  } catch (error) {
    console.error('[QuickGateway] createPaymentOrder error:', error.message);
    return { success: false, message: error.message };
  }
}

// =========================================================================
// 2. GET PAYMENT DETAILS
// =========================================================================
// GET https://api.quickgateway.in/api/payment/details/:paymentId
// Authorization: Bearer <merchant_token>
//
// Response:
//   {
//     "status": "SUCCESS",
//     "result": {
//       "paymentId": "...",
//       "trxId": "...",
//       "orderId": "...",
//       "amount": 100,
//       "status": 0 | 1 | -1,
//       "upiId": "...",
//       "merchantName": "...",
//       "method": "Paytm",
//       "customerMobile": "...",
//       "createdOn": "ISO date",
//       "paidOn": "ISO date | null",
//       "utr": "...",
//       "isCustomAmount": true | false,
//       "qrData": "...",
//       "paymentMode": "...",
//     }
//   }
//
// Error:
//   { "status": "FAILED", "message": "Payment not found" }  (404)
//   { "status": "FAILED", "message": "..." }                 (500)
// =========================================================================
async function getPaymentDetails(paymentId, merchantToken) {
  try {
    if (!paymentId) {
      return { success: false, data: { status: 'error', message: 'paymentId is required' } };
    }

    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}/payment/details/${encodeURIComponent(paymentId)}`,
      {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + merchantToken },
      }
    );

    if (response.status === 404) {
      return { success: false, data: { status: 'not_found', message: 'Payment not found' } };
    }

    const body = response.data || {};
    if (body.status === 'FAILED') {
      return { success: false, data: body };
    }

    const result = body.result || body;
    const paymentStatus = result.status;

    return {
      success: true,
      data: {
        paymentId: result.paymentId || paymentId,
        orderId: result.orderId || result.order_id || '',
        trxId: result.trxId || '',
        amount: result.amount,
        status: paymentStatus, // 0=pending, 1=success, -1=failed
        upiId: result.upiId || '',
        merchantName: result.merchantName || result.merchant_name || '',
        method: result.method || '',
        customerMobile: result.customerMobile || '',
        createdOn: result.createdOn,
        paidOn: result.paidOn || null,
        utr: result.utr || '',
        isCustomAmount: !!result.isCustomAmount,
        qrData: result.qrData || '',
        paymentMode: result.paymentMode || '',
      },
    };
  } catch (error) {
    console.error('[QuickGateway] getPaymentDetails error:', error.message);
    return { success: false, data: { status: 'error', message: error.message } };
  }
}

// =========================================================================
// 3. VERIFY PAYMENT
// =========================================================================
// POST https://api.quickgateway.in/api/payment/verify
// Request:  { trxId: "..." }
// Response: PLAIN TEXT — one of:
//   "SUCCESS"   → Payment confirmed
//   "FAILURE"   → Payment failed or expired
//   "PENDING"   → Still pending (keep polling)
//   "ALREADY"   → Already processed (treat as success)
//   "NOT_FOUND" → No record found
//   "FAILED"    → Generic failure
// =========================================================================
async function verifyPayment(paymentId, merchantToken) {
  // Step 1: Try getPaymentDetails first
  const details = await getPaymentDetails(paymentId, merchantToken);
  if (details.success) {
    const status = details.data.status;
    if (status === 1) return { success: true, data: { status: 'SUCCESS', ...details.data } };
    if (status === -1) return { success: false, data: { status: 'FAILURE', ...details.data } };
    return { success: false, data: { status: 'PENDING', ...details.data } };
  }

  // Step 2: Fallback to POST /payment/verify with trxId
  // (uses the transaction ID which may be the paymentId)
  try {
    const response = await httpsRequest(
      `${QUICKGATEWAY_BASE}/payment/verify`,
      { method: 'POST' },
      { trxId: paymentId }
    );

    const text = typeof response.data === 'string' ? response.data : (response.data?.status || '');
    const normalized = text.toUpperCase();

    if (normalized === 'SUCCESS' || normalized === 'ALREADY') {
      return { success: true, data: { status: 'SUCCESS' } };
    }
    if (normalized === 'FAILURE' || normalized === 'FAILED') {
      return { success: false, data: { status: 'FAILURE' } };
    }
    return { success: false, data: { status: normalized || 'PENDING' } };
  } catch (error) {
    console.error('[QuickGateway] verifyPayment error:', error.message);
    return { success: false, data: { status: 'FAILURE', message: error.message } };
  }
}

// =========================================================================
// 4. GET GATEWAY CONFIG
// =========================================================================
// Environment variable OVERRIDES DB setting.
// This allows deployment-time config that admins cannot change.
// =========================================================================
function getGatewayConfig(gatewayValue) {
  const config = gatewayValue || {};
  const envToken = env.quickgatewayMerchantToken || '';
  const merchantToken = config.apiKey || envToken || '';

  return {
    gatewayName: 'quickgateway',
    apiUrl: QUICKGATEWAY_BASE,
    apiKey: merchantToken,
    isActive: !!merchantToken,      // false if merchantToken is empty
    merchantToken: merchantToken,
    _source: config.apiKey ? 'database' : (envToken ? 'environment' : 'none'),
  };
}

function getMerchantToken(gatewayValue) {
  if (env.quickgatewayMerchantToken) return env.quickgatewayMerchantToken;
  return gatewayValue?.apiKey || '';
}

module.exports = {
  createPaymentOrder,
  verifyPayment,
  getPaymentDetails,
  getMerchantToken,
  getGatewayConfig,
  QUICKGATEWAY_BASE,
};
