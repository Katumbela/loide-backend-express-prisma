import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar usuários", error: error.message });
  }
};

export const store = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ status: false, message: "Nome, email e senha são obrigatórios." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    res.status(201).json({ status: true, message: 'Usuário criado com sucesso!', data: user });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao criar usuário", error: error.message });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });

    if (!user) {
      res.status(404).json({ status: false, message: 'Usuário não encontrado' });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao buscar usuário", error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const userData: any = {
      name,
      email,
    };

    if (password) {
      userData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: userData
    });

    res.json({ status: true, message: 'Usuário atualizado com sucesso!', data: user });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao atualizar usuário", error: error.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) }
    });

    res.json({ status: true, message: 'Usuário excluído com sucesso' });
  } catch (error: any) {
    res.status(404).json({ status: false, message: 'Usuário não encontrado' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(404).json({ status: false, message: "Usuário não encontrado." });
      return;  
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ status: false, message: "Senha inválida." });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

    res.json({ status: true, token });
  } catch (error: any) {
    res.status(500).json({ status: false, message: "Erro ao fazer login", error: error.message });
  }
};

