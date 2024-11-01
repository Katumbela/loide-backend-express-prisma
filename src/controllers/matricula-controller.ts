import { Request, Response } from 'express';
import prisma from '../../prisma/client';  

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const matriculas = await prisma.matricula.findMany({
      include: {
        aluno: true,
        curso: true,
        periodo: true,
        propinas: {
          include: {
            mes: true
          }
        }
      }
    });
    res.json(matriculas);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar matrículas", error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { cod_curso, cod_aluno, data, cod_periodo } = req.body;

  try {
    const matricula = await prisma.matricula.create({
      data: {
        cod_curso,
        cod_aluno,
        data: new Date(data),
        cod_periodo
      }
    });
    res.status(201).json({
      status: true,
      message: 'Matricula criada com sucesso!',
      data: matricula
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao criar matrícula", error: error.message });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const { cod_matricula } = req.params;

  try {
    const matricula = await prisma.matricula.findUnique({
      where: { n_matricula: Number(cod_matricula) },
      include: {
        aluno: true,
        curso: true,
        periodo: true,
        propinas: {
          include: { mes: true }
        }
      }
    });

    if (!matricula) {
      res.status(404).json({ status: false, message: 'Matrícula não encontrada' });
      return;
    }

    res.json(matricula);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar matrícula", error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { cod_matricula } = req.params;

  try {
    const matricula = await prisma.matricula.update({
      where: { n_matricula: Number(cod_matricula) },
      data: req.body
    });

    res.json({
      status: true,
      message: 'Matrícula atualizada com sucesso!',
      data: matricula
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao atualizar matrícula", error: error.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { cod_matricula } = req.params;

  try {
    await prisma.matricula.delete({
      where: { n_matricula: Number(cod_matricula) }
    });

    res.json({ status: true, message: 'Matrícula excluída com sucesso' });
  } catch (error: any) {
    res.status(404).json({ status: false, message: 'Matrícula não encontrada' });
  }
};
