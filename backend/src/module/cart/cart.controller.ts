import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.services';
import status from 'http-status';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { productId, quantity } = req.body;

  const cart = await CartServices.addToCart(
    userId,
    productId,
    Number(quantity),
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product added to cart',
    data: cart, // Changed from 'result' to 'cart'
  });
});

const getCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await CartServices.getCart(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

const deleteFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const result = await CartServices.deleteFromCart(userId, productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product removed from cart',
    data: result,
  });
});

export const CartController = {
  addToCart,
  getCart,
  deleteFromCart,
};
