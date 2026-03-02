import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
/* ========================== CORS ===================== */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
/* ======================= MIDDLEWARE ====================== */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
