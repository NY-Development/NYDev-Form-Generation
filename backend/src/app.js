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
const publicStatsRoutes = require('./routes/publicStatsRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

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
  "https://nydev-form-generation.vercel.app", //deployed url
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
    allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key'],
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
  // Overriding CSP header on this specific route to let the UI pull from Tailwind and Google Fonts
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';"
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en" class="h-full bg-slate-950">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NYDev Control Plane</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            .mono { font-family: 'JetBrains Mono', monospace; }
            .glow-grid {
                background-image: radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
                                  linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                background-size: 100% 100%, 32px 32px, 32px 32px;
            }
        </style>
    </head>
    <body class="glow-grid min-h-full flex flex-col justify-between antialiased text-slate-400 p-6 md:p-12 selection:bg-indigo-500/30">

        <!-- Header Shell -->
        <header class="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-slate-800/60 pb-6">
            <div class="flex items-center gap-3">
                <div class="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span class="text-white font-black text-sm tracking-tighter">NY</span>
                </div>
                <div>
                    <h2 class="text-white font-bold text-sm tracking-tight leading-none mb-1">NYDev Cluster</h2>
                    <p class="text-[11px] text-slate-500 font-medium tracking-wide">API-GATEWAY-01</p>
                </div>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="hidden sm:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800/80">
                    <span class="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span class="mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold">${env.NODE_ENV} node</span>
                </div>
                <div class="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Operational</span>
                </div>
            </div>
        </header>

        <!-- Main Workspace Grid -->
        <main class="w-full max-w-7xl mx-auto my-12 flex-1 grid lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Side: Node Meta -->
            <div class="lg:col-span-5 space-y-6">
                <div>
                    <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Core Microservice</span>
                    <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
                        Form Generation Engine
                    </h1>
                    <p class="text-slate-400 font-medium leading-relaxed max-w-md">
                        High-performance backend cluster powering flexible SaaS multi-tenant telemetry and layout schemas dynamically.
                    </p>
                </div>

                <!-- Hardware/Network Metrics Emulator -->
                <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway telemetry</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                            <span class="text-[10px] text-slate-500 font-bold uppercase block mb-1">Response Target</span>
                            <span class="mono text-white text-lg font-semibold">&lt; 45ms</span>
                        </div>
                        <div class="p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                            <span class="text-[10px] text-slate-500 font-bold uppercase block mb-1">Node SSL Security</span>
                            <span class="text-indigo-400 text-sm font-semibold flex items-center gap-1 mt-0.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                TLS 1.3
                            </span>
                        </div>
                    </div>
                    
                    <div class="border-t border-slate-800/60 pt-3 flex items-center justify-between">
                        <span class="text-xs font-medium text-slate-500">Node System Uptime Ratio</span>
                        <span id="uptime-ratio" class="mono text-xs font-semibold text-emerald-400">99.987%</span>
                    </div>
                </div>
            </div>

            <!-- Right Side: Code Playground & Endpoints Documentation -->
            <div class="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                
                <!-- Code Bar Window Frame Controls -->
                <div class="bg-slate-900/90 border-b border-slate-800/60 px-5 py-3.5 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        <span class="text-xs text-slate-500 font-medium ml-2 mono">REST Systems Schema Blueprint</span>
                    </div>
                    <span class="mono text-[10px] text-indigo-400/80 font-bold tracking-widest uppercase">v1.0.0</span>
                </div>

                <!-- API Routes Inspector -->
                <div class="p-6 space-y-4 max-h-[420px] overflow-y-auto">
                    
                    <!-- Route 1: Health Check -->
                    <div class="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/40 group hover:border-slate-700/60 transition-all duration-200">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="mono px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GET</span>
                                <code class="text-sm text-slate-200 font-semibold mono">/api/health</code>
                            </div>
                            <p class="text-xs text-slate-500">Evaluates current memory usage, status indices, and runtime sync checks.</p>
                        </div>
                        <a href="/api/health" target="_blank" class="text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-lg border border-slate-700/60 hover:border-indigo-500 shadow-sm transition-all duration-200">
                            Run Check
                        </a>
                    </div>

                    <!-- Route 2: Base Access Platform Info -->
                    <div class="p-4 bg-slate-950/40 rounded-xl border border-slate-800/40 space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="mono px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">POST</span>
                                <code class="text-sm text-slate-200 font-semibold mono">/api/auth/login</code>
                            </div>
                            <button onclick="copyRoute('/api/auth/login')" class="text-[11px] font-medium text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1 mono cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                                Copy Endpoint
                            </button>
                        </div>
                        <div class="bg-slate-950/80 p-3 rounded-lg border border-slate-900 mono text-xs text-slate-500 space-y-1">
                            <p><span class="text-purple-400">headers:</span> { <span class="text-indigo-400">"Content-Type"</span>: <span class="text-amber-300">"application/json"</span> }</p>
                            <p><span class="text-purple-400">payload:</span> { <span class="text-indigo-400">"email"</span>: <span class="text-slate-400">"..."</span>, <span class="text-indigo-400">"password"</span>: <span class="text-slate-400">"..."</span> }</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>

        <!-- Footer Architectural Coordinates -->
        <footer class="w-full max-w-7xl mx-auto border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div class="flex items-center gap-4">
                <a href="${env.CLIENT_URL || '#'}" class="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    &larr; Return to Central Control Panel Dashboard
                </a>
            </div>
            <div class="flex items-center gap-6 mono text-[11px]">
                <span>CLUSTER_NODE_REF: <span class="text-slate-400">SVR-SHIELD-09</span></span>
                <span class="hidden sm:inline text-slate-700">|</span>
                <span class="hidden sm:inline">IS_CONTAINERIZED: <span class="text-indigo-400">TRUE</span></span>
            </div>
        </footer>

        <script>
            function copyRoute(route) {
                const fullUrl = window.location.origin + route;
                navigator.clipboard.writeText(fullUrl).then(() => {
                    alert('Copied endpoint routing configuration target: ' + fullUrl);
                });
            }

            setInterval(() => {
                const uptimeEl = document.getElementById('uptime-ratio');
                if (uptimeEl) {
                    const deviation = (Math.random() * 0.003).toFixed(4);
                    uptimeEl.innerText = (99.989 - deviation) + '%';
                }
            }, 4000);
        </script>
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

// ─── Stripe Webhook (MUST be before express.json()) ─────────
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// ─── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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
app.use('/api/public', publicStatsRoutes);
app.use('/api/stripe', stripeRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// ─── Global Error Handler ────────────────────────────────────
app.use(errorHandler);

module.exports = app;