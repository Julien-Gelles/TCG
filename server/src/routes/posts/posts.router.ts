import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { CreatePostSchema, PostIdSchema, UpdatePostSchema } from './posts.schema';
import * as ctrl from './posts.controller';

const router = Router();

router.get('/', ctrl.getAllPosts);
router.get('/:id', validate(PostIdSchema, 'params'), ctrl.getPostById);
router.post('/', validate(CreatePostSchema), ctrl.createPost);
router.patch('/:id', validate(PostIdSchema, 'params'), validate(UpdatePostSchema), ctrl.updatePost);
router.delete('/:id', validate(PostIdSchema, 'params'), ctrl.deletePost);

export default router;
