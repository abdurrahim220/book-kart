export type IUserAddress = {
  village: string;
  city: string;
  post: string;
};

export type IUser = {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  profilePicture: string;
  phoneNumber: string;
  verifyToken?: string;
  isVerified: boolean;
  refreshToken?:string,
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  passwordChangedAt?: Date;
  role:'super-admin' |'admin' | 'seller' | 'buyer';
  status: 'in-progress' | 'blocked' | 'active';
  agreeTerms: boolean;
  addresses: IUserAddress;
  isDeleted: boolean;
};

export type UserStatus = 'in-progress' | 'blocked' | 'active';

export type UserRole = 'super-admin' | 'admin' | 'seller' | 'buyer';

