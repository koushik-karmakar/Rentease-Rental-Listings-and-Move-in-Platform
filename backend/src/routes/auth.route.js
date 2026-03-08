import { Router } from "express";
const authRouter = Router();
import {
  loginUser,
  registerUser,
  checkEmail,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(registerUser);
authRouter.route("/check-email").post(checkEmail);
authRouter.route("/auth-check").get(verifyJWT, checkAuth);

export { authRouter };
