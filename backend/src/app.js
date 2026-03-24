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
const connectDB = require('./config/database');
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

// ─── Database Connection ─────────────────────────────────────
// In Serverless, we connect at the top level
connectDB(env.MONGO_URI);

// ─── Security Middleware ─────────────────────────────────────
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// ─── CORS ────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "http://localhost:8081", // local mobile dev
  "http://192.168.1.12:8081", // local mobile dev on physical device
  "http://192.168.1.12:5000", // local mobile app on physical device
  "http://192.168.1.12", // Allow from your machine IP
  "https://ny-dev-form-generation.vercel.app", //deployed url
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
// ─── Welcome Page (Root Route) ───────────────────────────────
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NYDev API | Status: Online</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; }
            .gradient-bg { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
        </style>
    </head>
    <body class="gradient-bg min-h-screen flex items-center justify-center text-slate-200">
        <div class="max-w-md w-full p-8 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm">
            <div class="flex items-center justify-center mb-6">
                <div class="h-3 w-3 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span class="text-emerald-400 font-semibold tracking-wider text-sm uppercase">Systems Operational</span>
            </div>
            
            <h1 class="text-3xl font-extrabold text-white text-center mb-2">NYDev Form Generator</h1>
            <p class="text-slate-400 text-center mb-8">Multi-tenant SaaS Backend API v1.0.0</p>
            
            <div class="space-y-4">
                <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <p class="text-xs text-slate-500 uppercase font-bold mb-1">Health Check Endpoint</p>
                    <code class="text-blue-400 text-sm">GET /api/health</code>
                </div>
                <div class="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <p class="text-xs text-slate-500 uppercase font-bold mb-1">Environment</p>
                    <code class="text-amber-400 text-sm">${env.NODE_ENV}</code>
                </div>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-700/50 text-center">
                <a href="${env.CLIENT_URL}" class="text-sm text-slate-400 hover:text-white transition-colors">
                    &larr; Back to Main Application
                </a>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.use('/api/', limiter);

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
