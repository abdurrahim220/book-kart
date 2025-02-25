type ObjectId = string;

export type IUserAddress = {
  village: string;
  city: string;
  post: string;
  phoneNumber: string;
  zip: number;
  user: ObjectId;
};

export type ICartItem = {
  product: ObjectId;
  quantity: number;
};

export type ICart = {
  user: ObjectId;
  items: ICartItem[];
};

export type IOrderItem = {
  product: ObjectId;
  quantity: number;
};

export type IOrder = {
  user: ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: "pending" | "success" | "failed";
  totalAmount: number;
  // paymentDetails: {
  //   razorpay_order_id?: string;
  //   razorpay_payment_id?: string;
  //   razorpay_signature?: string;
  // };
  productStatus: "processing" | "shipped" | "delivered" | "cancelled";
};

export type BookDetails = {
  title: string;
  images: string[];
  category: string;
  condition: string;
  classType: string;
  subject: string;
  author: string;
  edition: string;
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  rating?: number;
  reviews?: ObjectId[];
  shippingCharge: number;
  seller: ObjectId;
};

export type IUser = {
  name: string;
  email: string;
  profilePicture: string;
  isVerified: boolean;
  role: "super-admin" | "admin" | "seller" | "buyer";
  status: "in-progress" | "blocked" | "active";
  agreeTerms: boolean;
  addresses?: ObjectId;
  isDeleted: boolean;
};

export type UserStatus = "in-progress" | "blocked" | "active";
export type UserRole = "super-admin" | "admin" | "seller" | "buyer";

export type IWishlist = {
  user: ObjectId;
  products: ObjectId[];
};

export type IBackendUser = IUser & {
  password?: string;
  googleId?: string;
  verifyToken?: string;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  passwordChangedAt?: Date;
};
