import { User } from '../user/user.model';

import httpStatus from 'http-status';
import {
  ILoginPayload,
  ILoginResponse,
  IRefreshTokenPayload,
} from './auth.interface';
import { generateToken, verifyToken } from './auth.utils';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import ApiError from '../../error/ApiError';
import { config } from '../../config';
import { sendResetPasswordLinkToEmail } from '../../utils/emailVerify';

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
    throw new ApiError('Invalid refresh token', httpStatus.FORBIDDEN);
  }

  // Generate new access token
  const newAccessToken = generateToken(
    { userId: user._id, role: user.role },
    config.jWT_REFRESH_SECRET!,
    config.jWT_REFRESH_EXPIRES_IN!,
  );

  return { accessToken: newAccessToken };
};

const forgotPassword = async ({ email }: { email: string }) => {
  // console.log('email', email);
  const user = await User.findOne({ email });
  // console.log('user', user);
  if (!user) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND);
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  // 4. Save hashed token and expiration to user
  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpires = resetTokenExpires;
  await user.save();

  // 5. Send email with raw token
  const resetUrl = `${config.fronted_url}/reset-password/${resetToken}`;


  await sendResetPasswordLinkToEmail(user.email, resetUrl);
};

const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) {
    throw new ApiError('Invalid or expired token', httpStatus.BAD_REQUEST);
  }
  user.password = password;

  // 4. Remove reset token fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  // 5. Save user
  await user.save();
};


const logout = async (req: Request) => {

  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ApiError('No token provided', httpStatus.UNAUTHORIZED);
  }

  // Find user by refresh token and remove it
  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new ApiError('Invalid token', httpStatus.UNAUTHORIZED);
  }

  // Clear refresh token from the database
  user.refreshToken = undefined;
  await user.save();
};


export const AuthServices = {
  loginUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  logout,
};
