 

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function userSeeder() {
  const users = [
    {
      name: 'Joao Afonso Katumbela',
      role: 'Admin',
      email: 'katumbela@sistema.com',
      password: '123456',
    },
    {
      name: 'Loide Gada',
      role: 'Admin',
      email: 'loide@sistema.com',
      password: 'outrasenha',
    },
    {
      name: 'Katumbela',
      role: 'editor',
      email: 'john@sistema.com',
      password: 'outrasenha',
    },
  ];

 
  await prisma.user.createMany({
    data: users,
  });

  console.log('Usuários seedados com sucesso!');
}

userSeeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
