import { Router } from 'express';
import postsRouter from './posts/posts.router';

// ─── Register all domain routers here ─────────────────────────────────────────
const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/posts', postsRouter);

export default router;
