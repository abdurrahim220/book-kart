import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductService } from './product.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.user?._id;

 

  if (!sellerId) {
    return sendResponse(res, {
      statusCode: status.UNAUTHORIZED,
      success: false,
      message: "Unauthorized: Seller ID not found",
      data: null,
    });
  }


  const result = await ProductService.createProduct(req.body, sellerId);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
