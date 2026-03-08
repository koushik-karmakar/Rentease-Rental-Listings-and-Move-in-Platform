import { Router } from "express";
const ownerRoute = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sendEmailOTP } from "../controllers/service.controller.js";
import { verifyEmailOTP } from "../controllers/service.controller.js";
ownerRoute.post("/send-email-otp", verifyJWT, sendEmailOTP);
ownerRoute.post("/verify-email-otp", verifyJWT, verifyEmailOTP);

export { ownerRoute };
