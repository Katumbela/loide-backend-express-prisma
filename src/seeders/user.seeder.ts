

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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
      name: 'Katumnbela',
      role: 'editor',
      email: 'john@sistema.com',
      password: 'outrasenha',
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        role: user.role,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

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
