import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import alunoRoutes from './routes/aluno';
import matriculaRoutes from './routes/matricula';
import propinaRoutes from './routes/propina';
import periodoRoutes from './routes/periodo';
import mesRoutes from './routes/mes';
import userRoutes from './routes/user';
import cursoRoutes from './routes/curso';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/api", apiRoutes);
app.use('/api', alunoRoutes);
app.use('/api', matriculaRoutes);
app.use('/api', propinaRoutes);
app.use('/api', periodoRoutes);
app.use('/api', userRoutes);
app.use('/api', mesRoutes);
app.use('/api', cursoRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
