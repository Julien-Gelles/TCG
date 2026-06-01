import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PostListSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
export type PostList = z.infer<typeof PostListSchema>;

export const CreatePostSchema = PostSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreatePostPayload = z.infer<typeof CreatePostSchema>;
