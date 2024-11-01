import { Router } from 'express';
import { index, create, show, update, destroy } from '../controllers/aluno-controller';

const router = Router();

router.get('/alunos', index);
router.post('/alunos', create);
router.get('/alunos/:cod_aluno', show);
router.put('/alunos/:cod_aluno', update);
router.delete('/alunos/:cod_aluno', destroy);

export default router;
