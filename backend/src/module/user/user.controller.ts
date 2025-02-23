import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const getUserByIdUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserByIdUser(req.user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User found successfully',
    data: result,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const token = req.params.token;
  await UserServices.verifyEmail(token); // Remove result assignment

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Email verified successfully',
    data: null, // Remove result from response
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserRole(req.user, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User role updated successfully',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserStatus(req.user, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getUserByIdUser,
  verifyEmail,
  updateUserRole,updateUserStatus
};
