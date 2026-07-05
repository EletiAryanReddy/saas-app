import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { user, accessToken, refreshToken };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (
  refreshToken: string
) => {
  const decoded: any = jwt.verify(
    refreshToken,
    REFRESH_SECRET
  );

  const accessToken = jwt.sign(
    { id: decoded.id, email: decoded.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  return { accessToken };
};

export const logoutUser = async (userId: string) => {
  return {
    success: true,
    message: "Logout successful",
    userId,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const forgotPassword = async (email: string) => {
  return { success: true, message: "Password reset flow pending", email };
};

export const resetPassword = async (token: string, password: string) => {
  return { success: true, message: "Password reset successful" };
};

export const sendEmailVerification = async (email: string) => {
  return { success: true, message: "Verification email sent", email };
};

export const verifyEmail = async (token: string) => {
  return { success: true, message: "Email verified successfully" };
};