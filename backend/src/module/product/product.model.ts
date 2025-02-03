import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    image: [
      { type: String, required: [true, 'At least one image is required'] },
    ],
    category: { type: String, required: [true, 'Category is required'] },
    condition: { type: String, required: [true, 'Condition is required'] },
    classType: { type: String, required: [true, 'Class type is required'] },
    subject: { type: String, required: [true, 'Subject is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    edition: { type: String, required: [true, 'Edition is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discount: { type: Number, default: 0, min: 0, max: 100 },

    finalPrice: {
      type: Number,
     
      min: [0, 'Final price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    shippingCharge: {
      type: Number,
      required: [true, 'Shipping charge is required'],
      min: [0, 'Shipping charge cannot be negative'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller is required'],
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', function (next) {
  if (this.isModified('price') || this.isModified('discount')) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
  }
  next();
});

export const Product = model<IProduct>('Product', productSchema);
