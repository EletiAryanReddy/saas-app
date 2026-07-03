import { Router } from "express";
import passport from "../../config/passport";

import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  meController,
  googleCallbackController,
  sendOtpController,
  verifyOtpController,
  forgotPasswordController,
  resetPasswordController,
  sendVerifyEmailController,
  verifyEmailController,
} from "./auth.controller";

import { protect } from "./auth.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);
router.get("/me", protect, meController);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "http://localhost:3000/auth/login",
    session: false,
  }),
  googleCallbackController
);

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);

router.post(
  "/forgot-password",
  forgotPasswordController
);

router.post(
  "/reset-password",
  resetPasswordController
);

router.post(
  "/send-verify-email",
  sendVerifyEmailController
);

router.post(
  "/verify-email",
  verifyEmailController
);

export default router;