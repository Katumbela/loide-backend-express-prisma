import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/propina-controller';

const router = Router();

router.get('/propinas', index);
router.post('/propinas', create);
router.get('/propinas/:cod_propina', show);
router.put('/propinas/:cod_propina', update);
router.delete('/propinas/:cod_propina', destroy);

export default router;
