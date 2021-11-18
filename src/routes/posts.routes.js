import { Router } from 'express'
const router = Router()
import * as postsCtrl from '../controllers/posts.controller'
const { checkToken } = require('../auth/token_validation')
router.get('/', checkToken, postsCtrl.readAllPosts);
router.get('/:id', checkToken, postsCtrl.readPost);
router.post('/', checkToken, postsCtrl.createPost);
router.delete('/:id', checkToken, postsCtrl.delPost);
router.put('/:id', checkToken, postsCtrl.updatePost);
export default router;