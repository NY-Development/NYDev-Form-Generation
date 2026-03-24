const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const env = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

// Import route files
const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const formRoutes = require('./routes/formRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const publicRoutes = require('./routes/publicRoutes');
const verifyRoutes = require('./routes/verifyRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const brandingRoutes = require('./routes/brandingRoutes');

const app = express();

const connectDB = require('./config/database');
connectDB(env.MONGO_URI); 

// ─── Security Middleware ─────────────────────────────────────
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// ─── CORS ────────────────────────────────────────────────────
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// More aggressive rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.',
  },
});
app.use('/api/auth/', authLimiter);

// ─── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ─── Compression ─────────────────────────────────────────────
app.use(compression());

// ─── Logging ─────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NYDev Form Generator API is running',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── Mount Routes ────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/organizations', formRoutes);
app.use('/api/organizations', submissionRoutes);
app.use('/api/organizations', subscriptionRoutes);
app.use('/api/organizations', analyticsRoutes);
app.use('/api/organizations', brandingRoutes);
app.use('/api/f', publicRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/superadmin', superAdminRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// ─── Global Error Handler ────────────────────────────────────
app.use(errorHandler);

module.exports = app;
