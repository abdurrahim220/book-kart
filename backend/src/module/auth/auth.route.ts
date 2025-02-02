import express from 'express';
import { AuthController } from './auth.controller';

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


export const AuthRoutes = router;
