import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();
const app = express();
/* ========================== CORS ===================== */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
/* ======================= MIDDLEWARE ====================== */
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ===================== API ======================= */
import { authRouter } from "./routes/auth.route.js";
import { ownerRoute } from "./routes/owner.route.js";
app.use("/api/v1/auth/user", authRouter);
app.use("/api/v1/auth/owner", ownerRoute);
/* ===================== ERROR HANDLER ======================= */
app.use((err, req, res, next) => {
  console.error(err);
  if (err?.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
      errors: err.error || [],
    });
  }

  res.status(500).json({
    success: false,
    message: err?.message || "Internal Server Error",
  });
});

export { app };
