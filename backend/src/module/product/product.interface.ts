import { Types } from 'mongoose';

export type IProduct = {
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
  reviews?: Types.ObjectId[];
  shippingCharge: number;
  seller: Types.ObjectId;
};

export type IUpdateProduct = Partial<Omit<IProduct, 'seller' | 'reviews'>> & {
  imagesToDelete?: string[];
};
