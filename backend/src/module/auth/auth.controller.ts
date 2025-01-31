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

export const AuthController = {
  loginUser,
  refreshAccessToken,
};
