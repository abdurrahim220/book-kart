import express, { NextFunction, Request, Response } from 'express';
import { AuthController } from './auth.controller';
import passport from 'passport';
import { config } from '../../config';
import { generateToken } from '../../utils/generateToken';

const router = express.Router();

router.post(
  '/login',
  //   validateRequest(authValidations.loginValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/refresh-token',
  //   validateRequest(authValidations.refreshTokenValidationSchema),
  AuthController.refreshAccessToken,
);

router.post(
  '/forgot-password',
  // validateRequest(authValidations.forgotPasswordValidationSchema),
  AuthController.forgotPassword,
);

router.post('/reset-password/:token', AuthController.resetPassword);

router.post('/logout', AuthController.logout);

// google login or social login

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${config.fronted_url}`,
    session: false,
  }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.user as any;
      const accessToken = generateToken(userData);

      const refreshToken = generateToken(userData);

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.redirect(`${config.fronted_url}`);
    } catch (error) {
      next(error);
    }
  },
);

export const AuthRoutes = router;
