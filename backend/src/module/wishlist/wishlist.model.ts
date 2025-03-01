import { model, Schema } from 'mongoose';

// Define the schema
const wishListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Fixed typo: "require" -> "required"
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Define as an array of ObjectIds
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
export const WishList = model('WishList', wishListSchema);
