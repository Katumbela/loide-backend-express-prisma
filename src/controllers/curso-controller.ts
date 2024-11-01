import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const cursos = await prisma.curso.findMany({
      include: {
        matriculas: true
      }
    });
    res.json(cursos);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar cursos", error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { descricao, tipo_curso } = req.body;


  if (!descricao || !tipo_curso) {
    res.status(400).json({ status: false, message: "Descrição e tipo de curso são obrigatórios." });
    return;
  }

  try {
    const curso = await prisma.curso.create({
      data: { descricao, tipo_curso }
    });
    res.status(201).json({
      status: true,
      message: 'Curso criado com sucesso!',
      data: curso
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao criar curso", error: error.message });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const { cod_curso } = req.params;

  try {
    const curso = await prisma.curso.findUnique({
      where: { cod_curso: Number(cod_curso) },
      include: {
        matriculas: true
      }
    });

    if (!curso) {
      res.status(404).json({ status: false, message: 'Curso não encontrado' });
      return;
    }

    res.json(curso);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar curso", error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { cod_curso } = req.params;
  const { descricao, tipo_curso } = req.body;

  try {
    const curso = await prisma.curso.update({
      where: { cod_curso: Number(cod_curso) },
      data: { descricao, tipo_curso }
    });

    res.json({
      status: true,
      message: 'Curso atualizado com sucesso!',
      data: curso
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao atualizar curso", error: error.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { cod_curso } = req.params;

  try {
    await prisma.curso.delete({
      where: { cod_curso: Number(cod_curso) }
    });

    res.json({ status: true, message: 'Curso excluído com sucesso' });
  } catch (error) {
    res.status(404).json({ status: false, message: 'Curso não encontrado' });
  }
};
