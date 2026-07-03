import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleLoginService } from "../modules/auth/auth.google";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const data = await googleLoginService(
          profile
        );

        return done(null, data);
      } catch (error) {
        return done(error as any, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;