import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/errorInterface';
import status from 'http-status';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource[] = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue.message,
  }));
  
  return {
    statusCode:status.BAD_REQUEST,
    message: 'Validation error!',
    errorSources,
  };
};

export default handleZodError;