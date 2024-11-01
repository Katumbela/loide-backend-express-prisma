// src/seeders/database.seeder.ts

import { PrismaClient } from '@prisma/client';
import { userSeeder } from './user.seeder';
import { mesSeeder } from './mes.seeder';
import { periodoSeeder } from './periodo.seeder';
import { cursoSeeder } from './curso.seeder';
import { alunoSeeder } from './aluno.seeder';
import { matriculaSeeder } from './matricula.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding do banco de dados...');

  await userSeeder();
  await mesSeeder();
  await periodoSeeder();
  await cursoSeeder();
  await alunoSeeder();
  await matriculaSeeder(prisma);

  console.log('Banco de dados seedado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
