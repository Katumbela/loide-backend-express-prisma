import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function mesSeeder() {
  await prisma.mes.deleteMany(); // Limpa a tabela `Mes`

  const meses = [
    { cod_mes: 1, descricao: 'Janeiro' },
    { cod_mes: 2, descricao: 'Fevereiro' },
    { cod_mes: 3, descricao: 'Março' },
    { cod_mes: 4, descricao: 'Abril' },
    { cod_mes: 5, descricao: 'Maio' },
    { cod_mes: 6, descricao: 'Junho' },
    { cod_mes: 7, descricao: 'Julho' },
    { cod_mes: 8, descricao: 'Agosto' },
    { cod_mes: 9, descricao: 'Setembro' },
    { cod_mes: 10, descricao: 'Outubro' },
    { cod_mes: 11, descricao: 'Novembro' },
    { cod_mes: 12, descricao: 'Dezembro' },
  ];

  await prisma.mes.createMany({
    data: meses,
  });

  console.log('Meses seedados com sucesso!');
}

mesSeeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
