import express, { NextFunction, Request, Response } from 'express';
import { AuthController } from './auth.controller';
import passport from 'passport';
import { config } from '../../config';
import { IUser } from '../user/user.interface';

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
    failureRedirect: `${config.fronted_url}/login`,
    session: false,
  }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as IUser;
      const accessToken = await generateToken(user);
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.redirect(`${config.fronted_url}`);
    } catch (error) {
      next(error);
    }
  },
);

export const AuthRoutes = router;
