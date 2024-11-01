
import { PrismaClient } from '@prisma/client';


export const matriculaSeeder = async (prisma: PrismaClient) => {
  const matriculas = [
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
  ];

  for (const matricula of matriculas) {
    const existingMatricula = await prisma.matricula.findUnique({
      where: { n_matricula: matricula.n_matricula },
    });

    if (!existingMatricula) {
      await prisma.matricula.create({
        data: matricula,
      });
      console.log(`Matrícula ${matricula.n_matricula} inserida com sucesso.`);
    } else {
      console.log(`Matrícula ${matricula.n_matricula} já existe. Ignorando...`);
    }
  }

  console.log('Todas as matrículas processadas!');
};
