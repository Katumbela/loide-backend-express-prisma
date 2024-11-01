import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client';

const { JWT_SECRET } = process.env;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ status: false, message: "Todos os campos são obrigatórios" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.json({ status: true, message: "Usuário registrado com sucesso", user });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao registrar o usuário", error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ status: false, message: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ status: true, message: "Usuário autenticado com sucesso", token });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao fazer login", error: (error as Error).message });
  }
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ status: false, message: "Acesso negado" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    res.json({ status: true, message: "Dados do perfil", user });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar perfil", error: (error as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ status: false, message: "Acesso negado" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number };
    const newToken = jwt.sign({ id: decoded.id }, JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ status: true, message: "Novo token de acesso", token: newToken });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao gerar novo token", error: (error as Error).message });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.json({ status: true, message: "Usuário deslogado com sucesso" });
};
