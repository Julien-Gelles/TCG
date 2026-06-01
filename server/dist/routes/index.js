"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_router_1 = __importDefault(require("./posts/posts.router"));
// ─── Register all domain routers here ─────────────────────────────────────────
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/posts', posts_router_1.default);
exports.default = router;
