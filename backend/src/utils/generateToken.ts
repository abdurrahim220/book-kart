import { config } from '../config';
import jwt from 'jsonwebtoken';
import { IUser } from '../module/user/user.interface';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { userId: user?._id, role: user.role },
    config.jWT_REFRESH_SECRET as string,
    { expiresIn: '1d' }, // Optional: Add expiration time
  );
};
