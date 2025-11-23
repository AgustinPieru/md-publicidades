import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, AuthPayload } from '../types';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async login(credentials: LoginRequest): Promise<LoginResponse | null> {
    const { email, password } = credentials;

    // Buscar admin por email
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return null;
    }

    // Verificar password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return null;
    }

    // Generar JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no está configurado');
    }
    
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = (jwt as any).sign(
      { adminId: admin.id, email: admin.email },
      jwtSecret,
      { expiresIn }
    );

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }

  async verifyToken(token: string): Promise<AuthPayload | null> {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error('❌ JWT_SECRET no está configurado');
        return null;
      }
      
      const payload = jwt.verify(token, jwtSecret) as AuthPayload;
      return payload;
    } catch (error: any) {
      console.error('❌ Error al verificar token:', error.message);
      if (error.name === 'TokenExpiredError') {
        console.error('   Token expirado');
      } else if (error.name === 'JsonWebTokenError') {
        console.error('   Token inválido:', error.message);
      } else if (error.name === 'NotBeforeError') {
        console.error('   Token no válido aún');
      }
      return null;
    }
  }

  async createAdmin(email: string, password: string): Promise<boolean> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
