import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string({
    required_error: 'User name is required.',
    invalid_type_error: 'User name user must be a string.',
  }).min(5, { message: 'User name must be 5 or more characters.' }),
  email: z.string({
    required_error: 'Email is required.',
    invalid_type_error: 'Email must be a string.',
  }),
  password: z.string({
    invalid_type_error: 'Password must be a string',
  }).min(6, { message: 'Password must be 6 or more characters.' }).optional(),
});

export type User = z.infer<typeof UserSchema>;
