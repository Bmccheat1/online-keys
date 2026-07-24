/**
 * QUICKGATEWAY CLIENT API — Frontend Reference
 * ==============================================
 * 
 * All calls go through the backend proxy (/api/quickgateway-proxy/)
 * to avoid CORS issues when calling the gateway directly from browser.
 * 
 * The proxy forwards to: https://api.quickgateway.in/api/
 * 
 * ─── USAGE ────────────────────────────────────────────────────
 *   import { quickGatewayAPI } from '../utils/quickgateway';
 * 
 *   // Create order (if you want to bypass your own backend)
 *   const res = await quickGatewayAPI.createOrder({ user_token, amount, customer_mobile });
 * 
 *   // Get payment details
 *   const res = await quickGatewayAPI.getPaymentDetails('pay_xxx');
 * 
 *   // Verify payment
 *   const res = await quickGatewayAPI.verifyPayment('trx_xxx');
 *   // res.data is plain text: "SUCCESS" | "FAILURE" | "PENDING" | "ALREADY"
 * 
 *   // Set custom amount
 *   const res = await quickGatewayAPI.setPaymentAmount('pay_xxx', 500);
 * 
 * ─── PROXY ENDPOINTS ─────────────────────────────────────────
 *   POST  /api/quickgateway-proxy/create-order           → create order
 *   GET   /api/quickgateway-proxy/payment/details/:id    → get payment details
 *   POST  /api/quickgateway-proxy/payment/verify         → verify payment (plain text)
 *   POST  /api/quickgateway-proxy/payment/set-amount/:id → set custom amount
 * 
 * ─── RESPONSE CODES ─────────────────────────────────────────
 *   Payment status (from getPaymentDetails):
 *     0  → Pending (awaiting payment)
 *     1  → Success (payment received)
 *    -1  → Failed/Expired
 * 
 *   Verify payment (plain text):
 *     "SUCCESS"   → Payment confirmed
 *     "FAILURE"   → Payment failed/expired
 *     "PENDING"   → Still awaiting confirmation
 *     "ALREADY"   → Already processed (treat as success)
 *     "NOT_FOUND" → No record for this trxId
 */

import axios from 'axios';

const PROXY_BASE = '/api/quickgateway-proxy';

const api = axios.create({
  baseURL: PROXY_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Create Order ──────────────────────────────────────────────
// POST /api/quickgateway-proxy/create-order
// Body: { user_token, customer_mobile, amount, [redirect_url], [order_id], [remark_1], [remark_2] }
// Success: { status: "SUCCESS", success: true, message: "ORDER_CREATED", result: { orderId, paymentId, paymentUrl, qrData?, paymentMode } }
// Error:   { status: "FAILED", success: false, message: "..." }
const createOrder = (data) => api.post('/create-order', data);

// ─── Get Payment Details ───────────────────────────────────────
// GET /api/quickgateway-proxy/payment/details/:paymentId
// Success: { status: "SUCCESS", result: { paymentId, trxId, amount, status, upiId, merchantName, ... } }
// Error:   { status: "FAILED", message: "Payment not found" }
const getPaymentDetails = (paymentId) => api.get(`/payment/details/${encodeURIComponent(paymentId)}`);

// ─── Verify Payment ────────────────────────────────────────────
// POST /api/quickgateway-proxy/payment/verify
// Body: { trxId: "..." }
// Response: PLAIN TEXT — "SUCCESS" | "FAILURE" | "PENDING" | "ALREADY" | "NOT_FOUND"
const verifyPayment = (trxId) => api.post('/payment/verify', { trxId });

// ─── Set Custom Amount ─────────────────────────────────────────
// POST /api/quickgateway-proxy/payment/set-amount/:paymentId
// Body: { amount: 100 }
// Success: { status: "SUCCESS", message: "Amount set to ₹100.00", result: { amount } }
// Error:   { status: "FAILED", message: "PAYMENT_NOT_FOUND" | "ALREADY_PAID" | "PAYMENT_EXPIRED" | ... }
const setPaymentAmount = (paymentId, amount) => api.post(`/payment/set-amount/${encodeURIComponent(paymentId)}`, { amount });

export const quickGatewayAPI = {
  createOrder,
  getPaymentDetails,
  verifyPayment,
  setPaymentAmount,
};

export default quickGatewayAPI;
