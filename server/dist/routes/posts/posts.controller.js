"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const errorHandler_1 = require("../../middleware/errorHandler");
const getAllPosts = async (_req, res, next) => {
    try {
        const rows = await db_1.db.select().from(schema_1.posts).orderBy(schema_1.posts.createdAt);
        res.json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllPosts = getAllPosts;
const getPostById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const [post] = await db_1.db.select().from(schema_1.posts).where((0, drizzle_orm_1.eq)(schema_1.posts.id, id));
        if (!post)
            throw new errorHandler_1.AppError(404, 'Post not found');
        res.json(post);
    }
    catch (err) {
        next(err);
    }
};
exports.getPostById = getPostById;
const createPost = async (req, res, next) => {
    try {
        const body = req.body;
        const [created] = await db_1.db.insert(schema_1.posts).values(body).returning();
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
};
exports.createPost = createPost;
const updatePost = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const body = req.body;
        const [updated] = await db_1.db
            .update(schema_1.posts)
            .set({ ...body, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.posts.id, id))
            .returning();
        if (!updated)
            throw new errorHandler_1.AppError(404, 'Post not found');
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const [deleted] = await db_1.db.delete(schema_1.posts).where((0, drizzle_orm_1.eq)(schema_1.posts.id, id)).returning();
        if (!deleted)
            throw new errorHandler_1.AppError(404, 'Post not found');
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deletePost = deletePost;
