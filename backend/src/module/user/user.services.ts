import status from 'http-status';
import ApiError from '../../error/ApiError';
import { sendVerificationToEmail } from '../../utils/emailVerify';
import { IUser } from './user.interface';
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
export const UserServices = {
  createUser,
  verifyEmail,
};
