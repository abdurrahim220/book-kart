// validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import ApiError from '../error/ApiError';
import httpStatus from 'http-status';

const validateRequest = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Optional: Assign parsed data to req object
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      req.validatedData = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        next(
          new ApiError(
            'Validation failed',
            httpStatus.BAD_REQUEST,
            errorMessages
          )
        );
      } else {
        next(error);
      }
    }
  };

export default validateRequest;