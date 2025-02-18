/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';
import ApiError from '../error/ApiError';
import httpStatus from 'http-status';
import { User } from '../module/user/user.model';

// Extend Request to include user info
interface AuthRequest extends Request {
  user?: any;
}

// Middleware factory function to allow multiple roles
export const auth = (
  ...allowedRoles: ('super-admin' | 'admin' | 'seller' | 'buyer')[]
) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new ApiError(
          'Unauthorized: No token provided',
          httpStatus.UNAUTHORIZED,
        );
      }

      // Verify token
      const decoded = jwt.verify(token, config.jWT_REFRESH_SECRET!) as {
        userId: string;
        role: string;
      };
      // console.log(decoded)

      // Find user and attach to request
      const user = await User.findById(decoded.userId);
      if (!user || user.isDeleted) {
        throw new ApiError('User not found or deleted', httpStatus.NOT_FOUND);
      }

      // Check if user is verified
      if (!user.isVerified) {
        throw new ApiError('User is not verified', httpStatus.FORBIDDEN);
      }

      if (!allowedRoles.includes(user.role)) {
        throw new ApiError(
          'Forbidden: You do not have the required role',
          httpStatus.FORBIDDEN,
        );
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
