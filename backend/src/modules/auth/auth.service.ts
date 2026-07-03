import crypto from "crypto";
import User from "../user/user.model";
import {
  sendResetPasswordMail,
  sendVerifyEmailMail,
} from "./auth.mail";

export const forgotPassword = async (
  email: string
) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const token =
    crypto.randomBytes(32).toString("hex");

  user.otp = token;
  user.otpExpires =
    new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  await sendResetPasswordMail(
    email,
    token
  );

  return {
    success: true,
    message:
      "Password reset link sent to email",
  };
};

export const resetPassword = async (
  token: string,
  password: string
) => {
  const user = await User.findOne({
    otp: token,
    otpExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.password = password;
  user.otp = "";
  user.otpExpires = undefined;

  await user.save();

  return {
    success: true,
    message: "Password reset successful",
  };
};

export const sendEmailVerification =
async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const token =
    crypto.randomBytes(32).toString("hex");

  user.otp = token;
  user.otpExpires =
    new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  await sendVerifyEmailMail(
    email,
    token
  );

  return {
    success: true,
    message: "Verification email sent",
  };
};

export const verifyEmail = async (
  token: string
) => {
  const user = await User.findOne({
    otp: token,
    otpExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.emailVerified = true;
  user.isVerified = true;
  user.otp = "";
  user.otpExpires = undefined;

  await user.save();

  return {
    success: true,
    message: "Email verified successfully",
  };
};