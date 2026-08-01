import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

const cache = new Map();
const CACHE_TTL = 30000;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get' && response.config.cache !== false) {
      const cacheKey = response.config.url + JSON.stringify(response.config.params || {});
      cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

api.getCached = async (url, config = {}) => {
  const cacheKey = url + JSON.stringify(config.params || {});
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const response = await api.get(url, config);
  return response.data;
};

api.clearCache = () => cache.clear();

export default api;

export const authAPI = {
  login: (data) => api.post('/auth/login', data).then((r) => r.data),
  register: (data) => api.post('/auth/register', data).then((r) => r.data),
  getMe: () => api.get('/auth/me').then((r) => r.data),
};

export const gameAPI = {
  getAll: (params) => api.getCached('/games', { params }),
  getById: (id) => api.getCached(`/games/${id}`),
  create: (data) => { api.clearCache(); return api.post('/games', data).then((r) => r.data); },
  update: (id, data) => { api.clearCache(); return api.put(`/games/${id}`, data).then((r) => r.data); },
  delete: (id) => { api.clearCache(); return api.delete(`/games/${id}`).then((r) => r.data); },
};

export const productAPI = {
  getAll: (params) => api.getCached('/products', { params }),
  getById: (id) => api.getCached(`/products/${id}`),
  create: (data) => { api.clearCache(); return api.post('/products', data).then((r) => r.data); },
  update: (id, data) => { api.clearCache(); return api.put(`/products/${id}`, data).then((r) => r.data); },
  delete: (id) => { api.clearCache(); return api.delete(`/products/${id}`).then((r) => r.data); },
};

export const keyAPI = {
  getStats: () => api.get('/keys/stats').then((r) => r.data),
  clearExpired: () => api.post('/keys/clear-expired').then((r) => r.data),
  getByProduct: (productId, params) => api.get(`/keys/${productId}`, { params }).then((r) => r.data),
  add: (data) => { api.clearCache(); return api.post('/keys/add', data).then((r) => r.data); },
  delete: (id) => { api.clearCache(); return api.delete(`/keys/${id}`).then((r) => r.data); },
};

export const orderAPI = {
  // QuickGateway Payment Flow
  initiate: (data) => api.post('/orders/initiate', data).then((r) => r.data),
  complete: (data) => api.post('/orders/complete', data).then((r) => r.data),
  release: (data) => api.post('/orders/release', data).then((r) => r.data),
  getMyOrders: () => api.get('/orders/my').then((r) => r.data),
  getAll: (params) => api.get('/orders', { params }).then((r) => r.data),
};

export const settingAPI = {
  getAll: () => api.get('/settings').then((r) => r.data),
  getByKey: (key) => api.get(`/settings/${key}`).then((r) => r.data),
  update: (key, data) => { api.clearCache(); return api.put(`/settings/${key}`, data).then((r) => r.data); },
};

export const configAPI = {
  get: () => api.getCached('/config'),
};

export const analyticsAPI = {
  getSummary: () => api.get('/analytics/summary').then((r) => r.data),
  getSalesChart: (days) => api.get(`/analytics/sales-chart?days=${days || 30}`).then((r) => r.data),
  getTopMods: (limit) => api.get(`/analytics/top-mods?limit=${limit || 10}`).then((r) => r.data),
};

export const couponAPI = {
  getAll: () => api.get('/coupons').then((r) => r.data),
  create: (data) => api.post('/coupons', data).then((r) => r.data),
  update: (id, data) => api.put(`/coupons/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/coupons/${id}`).then((r) => r.data),
  validate: (data) => api.post('/coupons/validate', data).then((r) => r.data),
};
