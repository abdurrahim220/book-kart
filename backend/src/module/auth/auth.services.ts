import { User } from '../user/user.model';

import httpStatus from 'http-status';
import {
  ILoginPayload,
  ILoginResponse,
  IRefreshTokenPayload,
} from './auth.interface';
import { generateToken, verifyToken } from './auth.utils';

import bcrypt from 'bcrypt';
import ApiError from '../../error/ApiError';
import { config } from '../../config';

const loginUser = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  const { email, password } = payload;

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND);
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
  }

  // Generate tokens
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

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshAccessToken = async (
  payload: IRefreshTokenPayload,
): Promise<{ accessToken: string }> => {
  const { refreshToken } = payload;

  // Verify refresh token
  const decoded = verifyToken(refreshToken, config.jWT_REFRESH_SECRET!);

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError('Invalid refresh token',httpStatus.FORBIDDEN);
  }

  // Generate new access token
  const newAccessToken = generateToken(
    { userId: user._id, role: user.role },
    config.jWT_REFRESH_SECRET!,
    config.jWT_REFRESH_EXPIRES_IN!,
  );

  return { accessToken: newAccessToken };
};

export const AuthServices = {
  loginUser,
  refreshAccessToken,
};
