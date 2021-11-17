import { Router } from 'express'
const router=Router();
import * as userCtrl from '../controllers/usuarios.controller';
router.post('/',userCtrl.createUser);
export default router;