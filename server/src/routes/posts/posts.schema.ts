import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(255),
  body: z.string().min(1),
});

export const UpdatePostSchema = CreatePostSchema.partial();

export const PostIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
