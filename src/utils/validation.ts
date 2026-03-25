import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
});

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const profileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  display_name: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be at most 50 characters'),
  bio: z.string().max(160, 'Bio must be at most 160 characters').optional(),
});

export const reviewSchema = z.object({
  place_id: z.string().min(1, 'Please select a place'),
  visit_date: z.string().min(1, 'Please select a visit date'),
  overall_score: z.number().min(1).max(10),
  notes: z.string().max(2000, 'Notes must be at most 2000 characters').optional(),
  is_private: z.boolean(),
});

export const reviewItemSchema = z.object({
  name: z.string().min(1, 'Item name is required').max(100),
  category: z.enum(['dish', 'drink']),
  score: z.number().min(1).max(10).optional(),
  notes: z.string().max(500).optional(),
});

export const collectionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  description: z.string().max(200).optional(),
  is_public: z.boolean(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ReviewItemInput = z.infer<typeof reviewItemSchema>;
export type CollectionInput = z.infer<typeof collectionSchema>;
