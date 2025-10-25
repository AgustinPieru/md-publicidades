import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    if (!result) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.json(result);
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const success = await authService.createAdmin(email, password);

    if (!success) {
      return res.status(400).json({ message: 'Error al crear admin' });
    }

    return res.status(201).json({ message: 'Admin creado exitosamente' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Validators
export const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];

export const validateCreateAdmin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];
