 
import { PrismaClient } from '@prisma/client';

export const matriculaSeeder = async (prisma: PrismaClient) => {
  await prisma.matricula.createMany({
    data: [
      {
        n_matricula: 1,
        cod_curso: 3,
        cod_aluno: 510,
        cod_periodo: 1,
        data: new Date('2024-06-12'),
      },
      {
        n_matricula: 2,
        cod_curso: 7,
        cod_aluno: 509,
        cod_periodo: 2,
        data: new Date('2024-06-15'),
      },
    ],
  });

  console.log('Matrículas seedadas com sucesso!');
};
