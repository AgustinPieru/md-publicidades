import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

export interface AuthenticatedRequest extends Request {
  admin?: {
    id: number;
    email: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    console.log('❌ Auth middleware: No token provided');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  const payload = await authService.verifyToken(token);
  if (!payload) {
    console.log('❌ Auth middleware: Invalid token');
    console.log('Token received:', token.substring(0, 20) + '...');
    return res.status(403).json({ message: 'Token inválido' });
  }

  req.admin = {
    id: payload.adminId,
    email: payload.email,
  };

  return next();
};
