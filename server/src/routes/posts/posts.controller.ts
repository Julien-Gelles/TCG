import { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { posts } from '../../db/schema';
import { AppError } from '../../middleware/errorHandler';
import type { CreatePostDto, UpdatePostDto } from './posts.schema';

export const getAllPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await db.select().from(posts).orderBy(posts.createdAt);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if (!post) throw new AppError(404, 'Post not found');
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as CreatePostDto;
    const [created] = await db.insert(posts).values(body).returning();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const body = req.body as UpdatePostDto;
    const [updated] = await db
      .update(posts)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    if (!updated) throw new AppError(404, 'Post not found');
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const [deleted] = await db.delete(posts).where(eq(posts.id, id)).returning();
    if (!deleted) throw new AppError(404, 'Post not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
