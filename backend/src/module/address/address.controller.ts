import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { addressServices } from './address.services';

const addOrUpdateAddress = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const result = await addressServices.addOrUpdateAddress(userId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: 'Address Added Or Updated Successfully',
    success: true,
    data: result,
  });
});


export const addressController = {
    addOrUpdateAddress,

};
