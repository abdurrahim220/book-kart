import { WishList } from './wishlist.model';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { WhishListServices } from './wishlist.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { productId } = req.body;

  const result = await WhishListServices.addToWishList(userId, productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product added to whishList',
    data: result,
  });
});

const getWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await WhishListServices.getWishList(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'WishList retrieved successfully',
    data: result,
  });
});

const deleteFromWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const result = await WhishListServices.deleteFromWishList(userId, productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product removed from Wishlist',
    data: result,
  });
});

export const WishListController = {
  addToWishList,
  getWishList,
  deleteFromWishList,
};
