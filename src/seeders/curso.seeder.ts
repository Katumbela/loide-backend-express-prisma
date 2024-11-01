import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tiposCursos = [
  { cod_curso: 10, descricao: '10ª classe', tipo_curso: 'Ciencias Fisicas e Biologicas' },
  { cod_curso: 11, descricao: '11ª classe', tipo_curso: 'Ciências Econômicas e Jurídicas' },
  { cod_curso: 12, descricao: '12ª classe', tipo_curso: 'Direito' },
];

export async function cursoSeeder() {
  const cursos = Array.from({ length: 9 }, (_, i) => ({
    cod_curso: i + 1,
    descricao: `${i + 1}ª classe`,
    tipo_curso: '',
  })).concat(tiposCursos);

  await prisma.curso.createMany({
    data: cursos,
    skipDuplicates: true,
  });

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
