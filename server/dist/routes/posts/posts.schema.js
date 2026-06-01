"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostIdSchema = exports.UpdatePostSchema = exports.CreatePostSchema = void 0;
const zod_1 = require("zod");
exports.CreatePostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    body: zod_1.z.string().min(1),
});
exports.UpdatePostSchema = exports.CreatePostSchema.partial();
exports.PostIdSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
});
