import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/periodo-controller';

const router = Router();

router.get('/periodos', index);
router.post('/periodos', create);
router.get('/periodos/:cod_periodo', show);
router.put('/periodos/:cod_periodo', update);
router.delete('/periodos/:cod_periodo', destroy);

export default router;
