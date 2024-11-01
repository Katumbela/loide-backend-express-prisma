import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/matricula-controller';

const router = Router();

router.get('/matriculas', index);
router.post('/matriculas', create);
router.get('/matriculas/:cod_matricula', show);
router.put('/matriculas/:cod_matricula', update);
router.delete('/matriculas/:cod_matricula', destroy);

export default router;
