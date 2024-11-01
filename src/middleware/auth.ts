import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

interface JwtPayload {
  id: number;
}

 
declare global {
  namespace Express {
    interface Request {
      userId?: number; 
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ status: false, message: "Acesso negado" });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.userId = verified.id; 
    next();
  } catch (error: any) {
    res.status(400).json({ status: false, message: "Token inválido" });
  }
};
