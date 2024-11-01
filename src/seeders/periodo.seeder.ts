 

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function periodoSeeder() {
 
  const periodos = [
    { cod_periodo: 1, descricao: 'Manhã' },
    { cod_periodo: 2, descricao: 'Tarde' },
    { cod_periodo: 3, descricao: 'Noite' },
  ];

  
  for (const periodo of periodos) {
    await prisma.periodo.create({
      data: periodo,
    });
  }

  console.log('Períodos seedados com sucesso!');
}

periodoSeeder ()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
