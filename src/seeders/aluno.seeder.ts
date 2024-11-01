 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const alunos = [
  {
    cod_aluno: 500,
    nome: 'Fulano de Tal',
    data_nascimento: new Date('1995-01-01'),
    genero: 'Masculino',
    morada: 'Rua Principal, 123',
    telefone: '123456789',
    bi: '1234567890',
  },
  {
    cod_aluno: 501,
    nome: 'Ciclana de Souza',
    data_nascimento: new Date('1990-05-10'),
    genero: 'Feminino',
    morada: 'Avenida Secundária, 456',
    telefone: '987654321',
    bi: '0987654321',
  },
  {
    cod_aluno: 502,
    nome: 'Beltrano da Silva',
    data_nascimento: new Date('1998-12-20'),
    genero: 'Masculino',
    morada: 'Rua dos Fundos, 789',
    telefone: '555555555',
    bi: '5555555555',
  },
  {
    cod_aluno: 503,
    nome: 'Maria Oliveira',
    data_nascimento: new Date('1993-07-15'),
    genero: 'Feminino',
    morada: 'Avenida Principal, 456',
    telefone: '333333333',
    bi: '3333333333',
  },
  {
    cod_aluno: 504,
    nome: 'José Santos',
    data_nascimento: new Date('1994-02-28'),
    genero: 'Masculino',
    morada: 'Rua da Esquina, 789',
    telefone: '444444444',
    bi: '4444444444',
  },
  {
    cod_aluno: 505,
    nome: 'Ana Silva',
    data_nascimento: new Date('1996-10-05'),
    genero: 'Feminino',
    morada: 'Travessa da Rua Principal, 123',
    telefone: '666666666',
    bi: '6666666666',
  },
  {
    cod_aluno: 506,
    nome: 'Pedro Oliveira',
    data_nascimento: new Date('1997-04-17'),
    genero: 'Masculino',
    morada: 'Avenida das Flores, 789',
    telefone: '777777777',
    bi: '7777777777',
  },
  {
    cod_aluno: 507,
    nome: 'Carla Sousa',
    data_nascimento: new Date('1992-09-30'),
    genero: 'Feminino',
    morada: 'Rua da Praia, 456',
    telefone: '888888888',
    bi: '8888888888',
  },
  {
    cod_aluno: 508,
    nome: 'João Oliveira',
    data_nascimento: new Date('1991-03-12'),
    genero: 'Masculino',
    morada: 'Avenida Central, 789',
    telefone: '999999999',
    bi: '9999999999',
  },
  {
    cod_aluno: 509,
    nome: 'Sara Santos',
    data_nascimento: new Date('1999-06-25'),
    genero: 'Feminino',
    morada: 'Rua do Bosque, 456',
    telefone: '1010101010',
    bi: '1010101010',
  },
  {
    cod_aluno: 510,
    nome: 'Luís Pereira',
    data_nascimento: new Date('1990-11-08'),
    genero: 'Masculino',
    morada: 'Avenida dos Coqueiros, 789',
    telefone: '1212121212',
    bi: '1212121212',
  },
  {
    cod_aluno: 511,
    nome: 'Marta Costa',
    data_nascimento: new Date('1993-08-18'),
    genero: 'Feminino',
    morada: 'Rua do Lago, 456',
    telefone: '1313131313',
    bi: '1313131313',
  },
];

export async function alunoSeeder() {
  for (const aluno of alunos) {
    await prisma.aluno.create({
      data: aluno,
    });
  }
  console.log('Alunos seedados com sucesso!');
}

alunoSeeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
