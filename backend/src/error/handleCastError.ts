import { status } from 'http-status';
import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/errorInterface';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errors: TErrorSource[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode: status.BAD_REQUEST,
    message: 'Cast Error',
    errorSources: errors,
  };
};
export default handleCastError;
