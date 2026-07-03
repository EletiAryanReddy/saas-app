import { Request, Response } from "express";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  sendEmailVerification,
  verifyEmail,
} from "./auth.service";

import {
  sendPhoneOTP,
  verifyPhoneOTP,
} from "./auth.phone";

export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const data = await registerUser(
      name,
      email,
      password
    );

    res.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(
      email,
      password
    );

    res.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshController = async (
  req: Request,
  res: Response
) => {
  try {
    const { refreshToken } = req.body;

    const data = await refreshAccessToken(
      refreshToken
    );

    res.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.body;

    const data = await logoutUser(userId);

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const meController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const user = await getCurrentUser(
      req.user.id
    );

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleCallbackController =
async (
  req: Request | any,
  res: Response
) => {
  const data = req.user;

  const frontendUrl =
    process.env.FRONTEND_URL ||
    "http://localhost:3000";

  res.redirect(
    `${frontendUrl}/auth/login?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}`
  );
};

export const sendOtpController = async (
  req: Request,
  res: Response
) => {
  try {
    const { phone } = req.body;

    const data = await sendPhoneOTP(phone);

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtpController = async (
  req: Request,
  res: Response
) => {
  try {
    const { phone, otp } = req.body;

    const data = await verifyPhoneOTP(
      phone,
      otp
    );

    res.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPasswordController =
async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const data = await forgotPassword(email);

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPasswordController =
async (
  req: Request,
  res: Response
) => {
  try {
    const { token, password } = req.body;

    const data = await resetPassword(
      token,
      password
    );

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendVerifyEmailController =
async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const data =
      await sendEmailVerification(email);

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmailController =
async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.body;

    const data = await verifyEmail(token);

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};