/**
 * QuickGateway Payment API
 * =========================
 * API calls to QuickGateway through the backend proxy.
 * Uses /api/quickgateway-proxy/ to avoid CORS issues.
 * 
 * This mirrors the gateway's paymentAPI from utils/api.ts
 * but routes through the key selling website's backend proxy.
 */

import axios from 'axios';

// Proxy points to the key selling website's own backend → forwards to QuickGateway
const PROXY_BASE = '/api/quickgateway-proxy';

const api = axios.create({
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

export const quickGatewayAPI = {
  /**
   * Create a new payment order on QuickGateway
   * POST /api/quickgateway-proxy/create-order
   */
  createOrder: (data) => api.post(`${PROXY_BASE}/create-order`, data),

  /**
   * Get payment details by paymentId
   * GET /api/quickgateway-proxy/payment/details/:paymentId
   */
  getPaymentDetails: (paymentId) => api.get(`${PROXY_BASE}/payment/details/${encodeURIComponent(paymentId)}`),

  /**
   * Verify payment status by trxId
   * POST /api/quickgateway-proxy/payment/verify
   */
  verifyPayment: (trxId) => api.post(`${PROXY_BASE}/payment/verify`, { trxId }),

  /**
   * Set custom amount for a payment
   * POST /api/quickgateway-proxy/payment/set-amount/:paymentId
   */
  setPaymentAmount: (paymentId, amount) => api.post(`${PROXY_BASE}/payment/set-amount/${encodeURIComponent(paymentId)}`, { amount }),
};

export default quickGatewayAPI;
