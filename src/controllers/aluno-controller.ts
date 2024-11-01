import { Request, Response } from 'express';
import prisma from '../../prisma/client';  

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: {
        matriculas: true,
        propinas: {
          include: {
            mes: true
          }
        }
      }
    });
    res.json(alunos);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar alunos", error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { nome, data_nascimento, genero, morada, telefone, bi } = req.body;

  try {
    const aluno = await prisma.aluno.create({
      data: {
        nome,
        data_nascimento: new Date(data_nascimento),
        genero,
        morada,
        telefone,
        bi
      }
    });
    res.status(201).json({
      status: true,
      message: 'Aluno adicionado com sucesso!',
      data: aluno
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao adicionar aluno", error: error.message });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const { cod_aluno } = req.params;

  try {
    const aluno = await prisma.aluno.findUnique({
      where: { cod_aluno: Number(cod_aluno) },
      include: { matriculas: true }
    });

    if (!aluno) {
      res.status(404).json({ status: false, message: 'Aluno não encontrado' });
      return;
    }

    res.json(aluno);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar aluno", error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { cod_aluno } = req.params;

  try {
    const aluno = await prisma.aluno.update({
      where: { cod_aluno: Number(cod_aluno) },
      data: req.body
    });

    res.json({
      status: true,
      message: 'Aluno atualizado com sucesso!',
      data: aluno
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao atualizar aluno", error: error.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { cod_aluno } = req.params;

  try {
    const deletedAluno = await prisma.aluno.delete({
      where: { cod_aluno: Number(cod_aluno) }
    });

    res.json({ status: true, message: 'Aluno excluído com sucesso' });
  } catch (error: any) {
    res.status(404).json({ status: false, message: 'Aluno não encontrado' });
  }
};
