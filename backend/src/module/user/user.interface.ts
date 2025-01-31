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
  passwordChangedAt?: Date;
  role: 'admin' | 'seller' | 'buyer';
  status: 'in-progress' | 'blocked' | 'active';
  agreeTerms: boolean;
  addresses: IUserAddress;
  isDeleted: boolean;
};



