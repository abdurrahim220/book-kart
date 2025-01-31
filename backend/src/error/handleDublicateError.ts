/* eslint-disable @typescript-eslint/no-explicit-any */
import { status } from 'http-status';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/errorInterface';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const valueMatch = error.message.match(/"([^"]*)"/);
  const duplicatedValue = valueMatch ? valueMatch[1] : 'unknown';

  const duplicatedField = Object.keys(error.keyPattern || {})[0] || 'unknown';

  const errorSources: TErrorSource[] = [
    {
      path: duplicatedField,
      message: `${duplicatedValue} already exists. Please use another value!`,
    },
  ];

  return {
    statusCode: status.CONFLICT,
    message: `Duplicate field value: ${duplicatedValue}. Please use another value!`,
    errorSources,
  };
};

export default handleDuplicateError;
