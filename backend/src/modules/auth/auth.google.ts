import User from "../user/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./auth.jwt";

export const googleLoginService = async (
  profile: any
) => {
  const googleId = profile.id;

  const email =
    profile.emails?.[0]?.value;

  const name =
    profile.displayName || "Google User";

  const avatar =
    profile.photos?.[0]?.value || "";

  let user = await User.findOne({
    $or: [
      { googleId },
      { email },
    ],
  });

  if (!user) {
    user = await User.create({
      name,
      email,
      avatar,
      googleId,
      provider: "GOOGLE",
      isVerified: true,
      emailVerified: true,
    });
  }

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
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      provider: user.provider,
    },
    accessToken,
    refreshToken,
  };
};