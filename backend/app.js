import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import connectDb from "./src/config/db.js";
import configurePassport from "./src/config/passport.js";
import authRoutes from "./src/routes/authRoutes.js";
import formRoutes from "./src/routes/formRoutes.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";
import superAdminRoutes from "./src/routes/superAdminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database immediately for Serverless environments
connectDb().catch((err) => console.error("Initial DB connection failed:", err));

const corsOrigins = (process.env.CORS_ORIGIN || "").split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length ? corsOrigins : true,
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(passport.initialize());

configurePassport(passport);

/**
 * 1. BEAUTIFIED ROOT ROUTE
 * This resolves the 404 on the base URL and provides a clean status UI
 */
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>NYDev API | Status</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; }
        </style>
    </head>
    <body class="bg-[#0f172a] text-slate-300 min-h-screen flex items-center justify-center p-6">
        <div class="max-w-2xl w-full">
            <div class="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 class="text-4xl font-bold text-white tracking-tight mb-2">NYDev <span class="text-indigo-400">API</span></h1>
                        <p class="text-slate-400 font-medium">Backend Services & Orchestration</p>
                    </div>
                    <div class="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span class="text-emerald-400 text-sm font-bold uppercase tracking-wider">System Online</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                        <p class="text-xs font-bold text-slate-500 uppercase mb-1">Environment</p>
                        <p class="text-lg font-mono text-indigo-300">${process.env.NODE_ENV || 'production'}</p>
                    </div>
                    <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                        <p class="text-xs font-bold text-slate-500 uppercase mb-1">Active Routes</p>
                        <p class="text-lg text-slate-200">/api/auth, /api/forms...</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <p class="text-sm text-slate-500 font-medium mb-4">Documentation & Resources</p>
                    <a href="/health" class="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-all border border-transparent hover:border-slate-600 group">
                        <span class="font-medium">Health Check Endpoint</span>
                        <span class="text-slate-500 group-hover:text-indigo-400">→</span>
                    </a>
                </div>

                <div class="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 NYDev Engineering</p>
                    <div class="flex gap-6">
                        <span class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-indigo-500"></div> Node.js
                        </span>
                        <span class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-blue-500"></div> Express
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/superadmin", superAdminRoutes);

// Custom 404 for API routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`NYDev API running on port ${port}`);
  });
}

export default app;