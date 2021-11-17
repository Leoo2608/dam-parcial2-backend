import { Router} from 'express'
const router = Router()
import * as postsCtrl from '../controllers/posts.controller'
router.get('/', postsCtrl.readAllPosts);
router.get('/:id', postsCtrl.readPost);
router.post('/', postsCtrl.createPost);
router.delete('/:id', postsCtrl.delPost);
router.put('/:id', postsCtrl.updatePost);
export default router;