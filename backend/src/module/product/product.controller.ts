import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductService } from './product.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import ApiError from '../../error/ApiError';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.user?._id;

  if (!sellerId) {
    throw new ApiError('Not authenticated', status.UNAUTHORIZED);
  }

  const result = await ProductService.createProduct(req.body, sellerId);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const sellerId = req.user?._id;

  if (!sellerId) {
    throw new ApiError('Not authenticated', status.UNAUTHORIZED);
  }

  const result = await ProductService.updateProduct(
    productId,
    req.body,
    sellerId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});
const getSingleProducts = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  console.log(productId);
  const result = await ProductService.getSingleProducts({ productId });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});
const getSellerProducts = catchAsync(async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  const result = await ProductService.getSellerProducts({ sellerId });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = req.user?._id;
  const userRole = req.user?.role;

  if (!userId || !userRole) {
    throw new ApiError('Authentication required', status.UNAUTHORIZED);
  }

  const result = await ProductService.deleteProduct(
    productId,
    userId.toString(),
    userRole,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product permanently deleted',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSellerProducts,
  getSingleProducts,
  deleteProduct,
};
