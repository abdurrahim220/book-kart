import { Request, Response } from 'express';

import { AuthServices } from './auth.services';

import httpStatus from 'http-status';
import { ILoginResponse } from './auth.interface';
import { createAuthCookies } from './auth.utils';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  // Set cookies
  res.setHeader(
    'Set-Cookie',
    createAuthCookies({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken!,
    }),
  );

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshAccessToken({ refreshToken });

  // Update access token cookie
  res.setHeader('Set-Cookie', [
    `accessToken=${result.accessToken}; Path=/; HttpOnly; SameSite=Strict${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  ]);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token refreshed successfully',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
 
  await AuthServices.forgotPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully',
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;

  const { password } = req.body;
  
  await AuthServices.resetPassword({ token, password });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successful',
    data: null,
  });
});


const logout = catchAsync(async (req: Request, res: Response) => {
  // console.log(req)
  const refreshToken = req.cookies?.refreshToken;
  // const { refreshToken } = req.cookies;
  // console.log('refreshToken', refreshToken);
  await AuthServices.logout(refreshToken);

  // Clear cookies
  res.setHeader('Set-Cookie', [
    'accessToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
    'refreshToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
  ]);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logout successful',
    data: null,
  });
});

export const AuthController = {
  loginUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  logout
};
