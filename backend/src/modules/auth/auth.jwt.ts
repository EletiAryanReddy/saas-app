import jwt from "jsonwebtoken";

const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "access_secret";

const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "refresh_secret";

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { id: user._id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};