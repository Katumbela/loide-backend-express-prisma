import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const propinas = await prisma.propina.findMany();
    res.json(propinas);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar propinas", error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { valor, n_matricula, cod_mes, forma_pagamento } = req.body;

  const matriculaId = parseInt(n_matricula, 10);
  const mesId = parseInt(cod_mes, 10);
  const value = parseInt(valor, 10);

  try {

    const existingRecord = await prisma.propina.findFirst({
      where: {
        n_matricula: matriculaId,
        cod_mes: mesId
      }
    });


    if (!existingRecord) {
      const propina = await prisma.propina.create({
        data: {
          valor: value,
          n_matricula: matriculaId,
          cod_mes: mesId,
          forma_pagamento
        }
      });
      res.status(201).json({
        status: true,
        message: 'Pagamento de Propina realizado com sucesso!',
        data: propina
      });
    } else {
      res.status(208).json({ status: false, message: 'Já existe um registro com o pagamento deste mês' });
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ status: false, message: "Erro ao pagar propina", error: error.message });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const { cod_propina } = req.params;
  try {
    const propina = await prisma.propina.findUnique({
      where: { cod_propina: Number(cod_propina) },
      include: {
        matricula: true,
        mes: true
      }
    });

    if (!propina) {
      res.status(404).json({ status: false, message: 'Propina não encontrada' });
      return;
    }

    res.json(propina);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar propina", error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { cod_propina } = req.params;

  try {
    const propina = await prisma.propina.update({
      where: { cod_propina: Number(cod_propina) },
      data: req.body
    });

    res.json({
      status: true,
      message: 'Propina atualizada com sucesso!',
      data: propina
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao atualizar propina", error: error.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { cod_propina } = req.params;

  try {
    await prisma.propina.delete({
      where: { cod_propina: Number(cod_propina) }
    });

    res.json({ status: true, message: 'Propina excluída com sucesso' });
  } catch (error: any) {
    res.status(404).json({ status: false, message: 'Propina não encontrada' });
  }
};
