/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

import { v2 as cloudinary } from 'cloudinary';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    images: [
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

productSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as any;

  if (update?.price || update?.discount) {
    const price = update?.price || this._update.$set?.price;
    const discount = update?.discount || this._update.$set?.discount || 0;

    update.finalPrice = price - price * (discount / 100);
    update.finalPrice = Math.round(update.finalPrice * 100) / 100;

    this.setUpdate(update);
  }

  next();
});

// Add this to your product schema file
productSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const product = this as any;
      
      if (product.images?.length > 0) {
        await Promise.all(
          product.images.map(async (imageUrl: string) => {
            const urlParts = imageUrl.split('/');
            const publicId = urlParts
              .slice(urlParts.indexOf('upload') + 1)
              .join('/')
              .split('.')[0];
            
            await cloudinary.uploader.destroy(publicId);
          })
        );
      }
      next();
    } catch (error) {
      console.error('Error in pre-delete hook:', error);
      next(error as any);
    }
  }
);

export const Product = model<IProduct>('Product', productSchema);
