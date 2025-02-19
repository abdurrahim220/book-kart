import { model, Schema } from 'mongoose';
import { IOrder, IOrderItem } from './order.interface';

const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [OrderItemSchema],
    shippingAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
    },
    paymentDetails: {
      razorpay_payment_id: { type: String },
      razorpay_order_id: { type: String },
      razorpay_signature: { type: String },
    },
    productStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model('Order', OrderSchema);
