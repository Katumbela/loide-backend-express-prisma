import { Router } from 'express';
import { index, store, show, update, destroy, login } from '../controllers/user-controller';

const router = Router();

router.get('/users', index);
router.post('/users', store);
router.get('/users/:id', show);
router.put('/users/:id', update);
router.delete('/users/:id', destroy);
router.post('/login', login);

export default router;
