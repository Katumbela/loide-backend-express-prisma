import { Request, Response } from 'express';
import prisma from '../../prisma/client';  

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const meses = await prisma.mes.findMany({
      include: {
        propinas: true  
      }
    });
    res.json(meses);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar meses", error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { descricao } = req.body;

  try {
    const mes = await prisma.mes.create({
      data: { descricao }
    });
    res.status(201).json({
      status: true,
      message: 'Mês criado com sucesso!',
      data: mes
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao criar mês", error: error.message });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const { cod_mes } = req.params;

  try {
    const mes = await prisma.mes.findUnique({
      where: { cod_mes: Number(cod_mes) },
      include: {
        propinas: true 
      }
    });

    if (!mes) {
      res.status(404).json({ status: false, message: 'Mês não encontrado' });
      return;
    }

    res.json(mes);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar mês", error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { cod_mes } = req.params;
  const { descricao } = req.body;

  try {
    const mes = await prisma.mes.update({
      where: { cod_mes: Number(cod_mes) },
      data: { descricao }
    });

    res.json({
      status: true,
      message: 'Mês atualizado com sucesso!',
      data: mes
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao atualizar mês", error: error.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { cod_mes } = req.params;

  try {
    await prisma.mes.delete({
      where: { cod_mes: Number(cod_mes) }
    });

    res.json({ status: true, message: 'Mês excluído com sucesso' });
  } catch (error: any) {
    res.status(404).json({ status: false, message: 'Mês não encontrado' });
  }
};
