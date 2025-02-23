import status from 'http-status';
import ApiError from '../../error/ApiError';
import { IUserAddress } from './address.interface';
import { Address } from './address.model';
import { startSession } from 'mongoose';
import { User } from '../user/user.model';

const addOrUpdateAddress = async (
  userId: string,
  payload: Partial<IUserAddress>,
) => {
  if (!userId) {
    throw new ApiError('User ID is required', status.NOT_FOUND);
  }

  const session = await startSession();
  session.startTransaction();

  try {
    let address = await Address.findOne({ user: userId }).session(session);

    if (address) {
      address = await Address.findOneAndUpdate({ user: userId }, payload, {
        new: true,
        runValidators: true,
        session,
      });
    } else {
      address = (
        await Address.create([{ ...payload, user: userId }], { session })
      )[0];

      await User.findByIdAndUpdate(
        userId,
        { addresses: address._id },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return address;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const addressServices = {
  addOrUpdateAddress,
};
