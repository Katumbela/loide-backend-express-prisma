import { Request, Response } from 'express';
import prisma from '../../prisma/client';  

export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const periodos = await prisma.periodo.findMany({
            include: {
                matriculas: true 
            }
        });
        res.json(periodos);
    } catch (error: any) {
        res.status(500).json({ status: false, message: "Erro ao buscar períodos", error: error.message });
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    const { descricao } = req.body;

    try {
        const periodo = await prisma.periodo.create({
            data: { descricao }
        });
        res.status(201).json({
            status: true,
            message: 'Período criado com sucesso!',
            data: periodo
        });
    } catch (error: any) {
        res.status(500).json({ status: false, message: "Erro ao criar período", error: error.message });
    }
};

export const show = async (req: Request, res: Response): Promise<void> => {
    const { cod_periodo } = req.params;

    try {
        const periodo = await prisma.periodo.findUnique({
            where: { cod_periodo: Number(cod_periodo) },
            include: {
                matriculas: true 
            }
        });

        if (!periodo) {
            res.status(404).json({ status: false, message: 'Período não encontrado' });
            return;
        }

        res.json(periodo);
    } catch (error: any) {
        res.status(500).json({ status: false, message: "Erro ao buscar período", error: error.message });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const { cod_periodo } = req.params;
    const { descricao } = req.body;

    try {
        const periodo = await prisma.periodo.update({
            where: { cod_periodo: Number(cod_periodo) },
            data: { descricao }
        });

        res.json({
            status: true,
            message: 'Período atualizado com sucesso!',
            data: periodo
        });
    } catch (error: any) {
        res.status(500).json({ status: false, message: "Erro ao atualizar período", error: error.message });
    }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
    const { cod_periodo } = req.params;

    try {
        await prisma.periodo.delete({
            where: { cod_periodo: Number(cod_periodo) }
        });

        res.json({ status: true, message: 'Período excluído com sucesso' });
    } catch (error: any) {
        res.status(404).json({ status: false, message: 'Período não encontrado' });
    }
};
