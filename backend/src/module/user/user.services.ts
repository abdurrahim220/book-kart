import status from 'http-status';
import httpStatus from 'http-status';
import ApiError from '../../error/ApiError';
import { sendVerificationToEmail } from '../../utils/emailVerify';
import { IUser, UserRole, UserStatus } from './user.interface';
import { User } from './user.model';
import crypto from 'crypto';


const createUser = async (payload: IUser): Promise<IUser> => {
  const { name, email, password, agreeTerms, addresses, phoneNumber } = payload;

  const verifyToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex');

  const newUser = await User.create({
    name,
    email,
    password,
    phoneNumber,
    agreeTerms,
    addresses,
    verifyToken: hashedToken, // Store hashed token
  });
  await sendVerificationToEmail(email, verifyToken);

  return newUser;
};

const verifyEmail = async (token: string): Promise<void> => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    verifyToken: hashedToken,
  });

  if (!user) {
    throw new ApiError('Invalid or expired token', status.BAD_REQUEST);
  }

  user.isVerified = true;
  user.verifyToken = undefined;

  await user.save();
};

const updateUserRole = async (
  requestUser: { _id: string; role: string },
  payload: { userId: string; role: string },
): Promise<IUser> => {
  const { userId, role } = payload;

  // Check if target user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', status.NOT_FOUND);
  }

  // Validate role
  if (!['super-admin', 'admin', 'seller', 'buyer'].includes(role)) {
    throw new ApiError('Invalid user role', status.BAD_REQUEST);
  }

  // Prevent self-role modification for super-admin
  if (
    user._id.toString() === requestUser._id.toString() &&
    user.role === 'super-admin'
  ) {
    throw new ApiError(
      'Super-admin cannot modify their own role',
      status.FORBIDDEN,
    );
  }

  // Update role
  user.role = role as UserRole;
  await user.save();

  // Return user without sensitive data
  return user.toObject();
};

const updateUserStatus = async (
  requestUser: { _id: string; role: string },
  payload: { userId: string; status: string },
): Promise<IUser> => {
  const { userId, status } = payload;

  // Check if target user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND);
  }

  // Validate status
  if (!['in-progress', 'blocked', 'active'].includes(status)) {
    throw new ApiError('Invalid user status', httpStatus.BAD_REQUEST);
  }

  // Prevent self-status modification for admins
  if (
    user._id.toString() === requestUser._id.toString() &&
    status === 'blocked'
  ) {
    throw new ApiError(
      'You cannot block your own account',
      httpStatus.FORBIDDEN,
    );
  }

  // Update status
  user.status = status as UserStatus;
  await user.save();

  // Return user without sensitive data
  return user.toObject();
};

export const UserServices = {
  createUser,
  verifyEmail,
  updateUserRole,
  updateUserStatus,
};
