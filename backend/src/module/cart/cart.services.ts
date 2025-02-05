/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import ApiError from '../../error/ApiError';
import { Product } from '../product/product.model';
import { Cart } from './cart.model';

const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError('Product not found', status.NOT_FOUND);
  }

  if (product.seller.toString() === userId.toString()) {
    throw new ApiError(
      'You cannot add your own products to cart',
      status.FORBIDDEN,
    );
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  return await cart.save();
};

const getCart = () => {};
const deleteFromCart = () => {};
export const CartServices = {
  addToCart,
  getCart,
  deleteFromCart,
};
