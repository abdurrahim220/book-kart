import { model, Schema } from 'mongoose';

const wishListSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default:[],
    },
  },
  {
    timestamps: true,
  },
);

export const WishList = model('WishList', wishListSchema);
