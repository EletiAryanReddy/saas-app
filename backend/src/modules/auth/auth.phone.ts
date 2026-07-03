import User from "../user/user.model";
import {
  generateOTP,
  getOTPExpiry,
} from "./auth.otp";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./auth.jwt";

export const sendPhoneOTP = async (
  phone: string
) => {
  const otp = generateOTP();

  let user = await User.findOne({
    phone,
  });

  if (!user) {
    user = await User.create({
      name: "Phone User",
      phone,
      provider: "PHONE",
      phoneVerified: false,
      isVerified: false,
    });
  }

  user.otp = otp;
  user.otpExpires = getOTPExpiry();

  await user.save();

  console.log("PHONE OTP:", otp);

  return {
    success: true,
    message: "OTP sent successfully",
  };
};

export const verifyPhoneOTP = async (
  phone: string,
  otp: string
) => {
  const user = await User.findOne({
    phone,
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (
    !user.otpExpires ||
    user.otpExpires < new Date()
  ) {
    throw new Error("OTP expired");
  }

  user.phoneVerified = true;
  user.isVerified = true;
  user.otp = "";
  user.otpExpires = undefined;
  user.lastLogin = new Date();

  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      provider: user.provider,
    },
    accessToken,
    refreshToken,
  };
};