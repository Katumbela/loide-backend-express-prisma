 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tiposCursos = [
  'Ciencias Fisicas e Biologicas',
  'Ciências Econômicas e Jurídicas',
  'Direito',
];

export async function cursoSeeder() {

  for (let i = 1; i <= 9; i++) {
    await prisma.curso.create({
      data: {
        cod_curso: i,
        descricao: `${i}ª classe`,
        tipo_curso: '',
      },
    });
  }


  for (let i = 10; i <= 12; i++) {
    await prisma.curso.create({
      data: {
        cod_curso: i,
        descricao: `${i}ª classe`,
        tipo_curso: tiposCursos[i - 10],
      },
    });
  }

  console.log('Cursos seedados com sucesso!');
}

cursoSeeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
