import { z } from 'zod';

// Address Schema Validation
const addressValidationSchema = z.object({
  village: z
    .string({ required_error: 'Village is required' })
    .min(1, 'Village is required'),
  city: z
    .string({ required_error: 'City is required' })
    .min(1, 'City is required'),
  post: z
    .string({ required_error: 'Post is required' })
    .min(1, 'Post is required'),
});

// User Schema Validation
const userValidationSchema = z
  .object({
    body: z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name is required'),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .regex(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Invalid email address',
        ),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters'),
      googleId: z.string().optional(),
      verifyToken: z.string().optional().default(null),
      profilePicture: z
        .string()
        .url('Invalid URL format')
        .nullable()
        .optional(),
      phoneNumber: z
        .number({ required_error: 'Phone number is required' })
        .refine(
          (val) => val.toString().length === 10,
          'Must be a 10-digit number',
        ),
      isVerified: z.boolean().default(false),
      passwordChangedAt: z.date().optional(),
      role: z.enum(['admin', 'seller', 'buyer']).default('buyer'),
      status: z
        .enum(['in-progress', 'blocked', 'active'])
        .default('in-progress'),
      agreeTerms: z.literal(true, {
        errorMap: () => ({
          message: 'You must agree to the terms and conditions',
        }),
      }),
      addresses: addressValidationSchema,
      isDeleted: z.boolean().default(false),
    }),
  })
  .refine((data) => data.body.agreeTerms === true, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeTerms'],
  });

// Update specific validation schema (optional)
const updateUserValidationSchema = userValidationSchema.partial();

// Type exports
export type CreateUserInput = z.infer<typeof userValidationSchema>;
export type UpdateUserInput = z.infer<typeof updateUserValidationSchema>;

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
