import express from 'express';
import { AuthController } from './auth.controller';



const router = express.Router();

router.post(
  '/',
//   validateRequest(authValidations.loginValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/refresh-token',
//   validateRequest(authValidations.refreshTokenValidationSchema),
  AuthController.refreshAccessToken,
);

export const AuthRoutes = router;
