import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/mes-controller';

const router = Router();

router.get('/meses', index);
router.post('/meses', create);
router.get('/meses/:cod_mes', show);
router.put('/meses/:cod_mes', update);
router.delete('/meses/:cod_mes', destroy);

export default router;
