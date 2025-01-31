/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { IUser, IUserAddress } from './user.interface';
import bcrypt from 'bcrypt';

const userAddressSchema = new Schema<IUserAddress>({
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
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    refreshToken:{
      type:String,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{11}$/, 'Please fill a valid 10-digit phone number'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ['admin', 'seller', 'buyer'],
      default: 'buyer',
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked', 'active'],
      default: 'in-progress',
    },
    agreeTerms: {
      type: Boolean,
      required: [true, 'You must agree to the terms and conditions'],
      validate: {
        validator: (value: boolean) => value === true,
        message: 'You must agree to the terms and conditions',
      },
    },
    addresses: {
      type: userAddressSchema,
      required: [true, 'Address is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false, // Disable the __v field
  },
);

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);

    if (!this.isNew) {
      this.passwordChangedAt = new Date();
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

// Instance method for password comparison
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export const User = model<IUser>('User', userSchema);
