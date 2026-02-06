import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import connectDb from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/superadmin", superAdminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`NYDev API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

export default app;
