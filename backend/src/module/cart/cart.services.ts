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

const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId })
    .populate({
      path: 'items.product',
      select: 'title price finalPrice images stock',
    })
    .populate('user', 'name email');

  if (!cart) {
    return {
      user: userId,
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  // Calculate totals
  const totals = cart.items.reduce(
    (acc, item) => {
      const product = item.product as unknown as { finalPrice: number };
      acc.totalItems += item.quantity;
      acc.totalPrice += item.quantity * product.finalPrice;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 },
  );

  return {
    ...cart.toObject(),
    ...totals,
  };
};

const deleteFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError('Cart not found', status.NOT_FOUND);
  }

  const initialLength = cart.items.length;
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  if (cart.items.length === initialLength) {
    throw new ApiError('Product not found in cart', status.NOT_FOUND);
  }

  if (cart.items.length === 0) {
    await Cart.deleteOne({ _id: cart._id });
    return null;
  }

  await cart.save();
  return cart;
};

export const CartServices = {
  addToCart,
  getCart,
  deleteFromCart,
};
