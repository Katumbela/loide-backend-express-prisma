import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/curso-controller';

const router = Router();

router.get('/cursos', index);
router.post('/cursos', create);
router.get('/cursos/:cod_curso', show);
router.put('/cursos/:cod_curso', update);
router.delete('/cursos/:cod_curso', destroy);

export default router;
