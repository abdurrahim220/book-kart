import { model, Schema } from 'mongoose';
import { IUserAddress } from './address.interface';

const addressSchema = new Schema<IUserAddress>(
  {
    village: {
      type: String,
      required: [true, 'Village is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    post: {
      type: String,
      required: [true, 'Post is required'],
    },
    zip: {
      type: Number,
      required: [true, 'Zip code is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{11}$/, 'Please fill a valid 10-digit phone number'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Address = model<IUserAddress>('Address', addressSchema);
