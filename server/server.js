const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const env = require('./config/env');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const productRoutes = require('./routes/productRoutes');
const keyRoutes = require('./routes/keyRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingRoutes = require('./routes/settingRoutes');
const configRoutes = require('./routes/configRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const couponRoutes = require('./routes/couponRoutes');
const quickgatewayProxyRoutes = require('./routes/quickgatewayProxy');
const webhookRoutes = require('./routes/webhookRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Trust the first proxy hop (Vercel edge) — required for express-rate-limit
// to read the real client IP from X-Forwarded-For
app.set('trust proxy', 1);

// Connect to MongoDB (with serverless caching)
connectDB();

// ─── Middleware ──────────────────────────────────────────
app.use(compression()); // Compress responses (70-80% smaller)

app.use(cors({
  origin: env.isProd 
    ? process.env.FRONTEND_URL || 'https://keys-selling.vercel.app' 
    : 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({
  limit: '10mb',
  // Keep the raw body — required for HMAC webhook signature verification
  verify: (req, res, buf) => { req.rawBody = buf; },
}));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (stored in /uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Webhooks — MUST be before rate limiter (gateway retries are normal)
app.use('/api/webhooks', webhookRoutes);

// Rate limiting - prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Strict rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});
app.use('/api/auth/login', authLimiter);

// Logging in development
if (env.isDev) {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running', environment: env.nodeEnv });
});

// ─── Routes ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/products', productRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/config', configRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/quickgateway-proxy', quickgatewayProxyRoutes);
app.use('/api/upload', uploadRoutes);

// ─── Error Handling ─────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server (only for local dev, not Vercel) ─────
if (process.env.NODE_ENV !== 'production') {
  app.listen(env.port, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Keys Selling API Server             ║
║   📡 Port: ${env.port}                        ║
║   🌍 http://localhost:${env.port}              ║
║   📦 MongoDB: ${env.mongoUri ? 'Connected' : 'Local'}        ║
╚═══════════════════════════════════════════╝
    `);
  });
}

// Export for Vercel serverless
module.exports = app;