import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { OrderService } from './order.services';

const createOrUpdateOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const result = await OrderService.createOrUpdateOrder(userId, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Order created/updated successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getOrderById(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

const createPaymentWithRazorpay = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const result = await OrderService.getOrderById(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Payment successful',
      data: result,
    });
  },
);
const handleRazorPayWebHook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  if (!signature) {
    return res.status(status.BAD_REQUEST).json({ message: 'Signature missing' });
  }

  await OrderService.handleRazorPayWebHook(req.body, signature);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Payment webhook processed successfully',
  });
});


export const OrderController = {
  createOrUpdateOrder,
  getAllOrders,
  getOrderById,
  createPaymentWithRazorpay,
  handleRazorPayWebHook,
};
