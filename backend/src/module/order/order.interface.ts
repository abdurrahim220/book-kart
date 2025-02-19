import { Types } from 'mongoose';

export type IOrderItem = {
  product: Types.ObjectId;
  quantity: number;
};

export type IOrder = {
  user: Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  totalAmount: number;
  paymentDetails: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  productStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
};
