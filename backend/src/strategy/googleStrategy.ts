
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { config } from '../config';
import { Request } from 'express';
import { IUser } from '../module/user/user.interface';
import { User } from '../module/user/user.model';
import { generateToken } from '../module/auth/auth.utils';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id as string,
      clientSecret: config.google_client_secret as string,
      callbackURL: config.google_callback_uri as string,
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken,
      refreshToken,
      profile,
      done: (error: any, user?: IUser | false) => void,
    ) => {
      const { emails, displayName, photos } = profile;
      // console.log(profile);
      try {
        let user = await User.findOne({ email: emails?.[0]?.value });
        if (user) {
          if (!user.profilePicture && photos?.[0]?.value) {
            user.profilePicture = photos?.[0]?.value;
            await user.save();
          }
          return done(null, user);
        }
        user = await User.create({
          googleId: profile.id,
          email: emails?.[0]?.value,
          name: displayName,
          profilePicture: photos?.[0]?.value,
          isVerified: true,
          agreeTerms: true,
        });

        const accessToken = generateToken(
          { userId: user._id, role: user.role },
          config.jWT_REFRESH_SECRET!,
          config.jWT_REFRESH_EXPIRES_IN!,
        );

        const refreshToken = generateToken(
          { userId: user._id },
          config.jWT_REFRESH_SECRET!,
          config.jWT_REFRESH_EXPIRES_IN!,
        );

        // Update user with refresh token
        user.refreshToken = refreshToken;
        await user.save();
        done(null, { user, accessToken, refreshToken });
      } catch (error) {
        done(error);
      }
    },
  ),
);

export default passport;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
