import { Types } from 'mongoose';

export type IUserAddress = {
  village: string;
  city: string;
  post: string;
  phoneNumber: string;
  zip: number;
  user: Types.ObjectId;
};
