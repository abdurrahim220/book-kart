import { WishList } from './wishlist.model';
import status from 'http-status';
import ApiError from '../../error/ApiError';
import { Product } from '../product/product.model';

const addToWishList = async (userId: string, productId: string) => {
 
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError('Product not found', status.NOT_FOUND);
  }

  if (product.seller.toString() === userId.toString()) {
    throw new ApiError(
      'You cannot add your own products to the wishlist',
      status.FORBIDDEN,
    );
  }

  let wishList = await WishList.findOne({ user: userId });

  if (!wishList) {
    wishList = new WishList({
      user: userId,
      products: [], // This is now redundant since the schema ensures a default empty array
    });
  }

  // Check if the product is already in the wishlist
  if (wishList.products.includes(productId)) {
    throw new ApiError('Product already in the wishlist', status.CONFLICT);
  }

  wishList.products.push(productId);

  return await wishList.save();
};

const getWishList = async (userId: string) => {
  const wishList = await WishList.findOne({ user: userId }).populate(
    'products',
  );
  if (!wishList) {
    throw new ApiError('Wishlist not found', status.NOT_FOUND);
  }
  return wishList;
};

const deleteFromWishList = async (userId: string, productId: string) => {
  const wishList = await WishList.findOne({ user: userId });

  if (!wishList) {
    throw new ApiError('Wishlist not found', status.NOT_FOUND);
  }

  const productIndex = wishList.products.indexOf(productId);
  if (productIndex === -1) {
    throw new ApiError('Product not found in the wishlist', status.NOT_FOUND);
  }

  wishList.products.splice(productIndex, 1);

  return await wishList.save();
};

export const WhishListServices = {
  addToWishList,
  getWishList,
  deleteFromWishList,
};
