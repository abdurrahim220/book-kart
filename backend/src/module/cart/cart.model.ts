import { model, Schema } from 'mongoose';
import { ICart, ICartItem } from './cart.interface';

const cartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      require: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

// Fix model name and schema reference
export const Cart = model<ICart>('Cart', cartSchema);
