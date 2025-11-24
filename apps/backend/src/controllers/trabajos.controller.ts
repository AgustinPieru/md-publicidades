import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { TrabajosService } from '../services/trabajos.service';

const prisma = new PrismaClient();
const trabajosService = new TrabajosService(prisma);

export const getAllTrabajos = async (req: Request, res: Response) => {
  try {
    const trabajos = await trabajosService.getAllTrabajos();
    return res.json(trabajos);
  } catch (error) {
    console.error('Error getting trabajos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getTrabajoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajoId = parseInt(id);

    if (isNaN(trabajoId)) {
      return res.status(400).json({ message: 'ID de trabajo inválido' });
    }

    const trabajo = await trabajosService.getTrabajoById(trabajoId);
    if (!trabajo) {
      return res.status(404).json({ message: 'Trabajo no encontrado' });
    }

    return res.json(trabajo);
  } catch (error) {
    console.error('Error getting trabajo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createTrabajo = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.array(),
      });
    }

    const { titulo, descripcion, imagenPrincipalUrl, imagenes } = req.body;

    const trabajo = await trabajosService.createTrabajo({
      titulo,
      descripcion,
      imagenPrincipalUrl,
      imagenes,
    });

    return res.status(201).json(trabajo);
  } catch (error) {
    console.error('Error creating trabajo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajoId = parseInt(id);

    if (isNaN(trabajoId)) {
      return res.status(400).json({ message: 'ID de trabajo inválido' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.array(),
      });
    }

    const { titulo, descripcion, imagenPrincipalUrl, imagenes } = req.body;

    const updateData: any = {};
    if (titulo !== undefined) updateData.titulo = titulo;
    if (descripcion !== undefined) updateData.descripcion = descripcion;
    if (imagenPrincipalUrl !== undefined) updateData.imagenPrincipalUrl = imagenPrincipalUrl;
    if (imagenes !== undefined) updateData.imagenes = imagenes;

    const trabajo = await trabajosService.updateTrabajo(trabajoId, updateData);
    if (!trabajo) {
      return res.status(404).json({ message: 'Trabajo no encontrado' });
    }

    return res.json(trabajo);
  } catch (error) {
    console.error('Error updating trabajo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajoId = parseInt(id);

    if (isNaN(trabajoId)) {
      return res.status(400).json({ message: 'ID de trabajo inválido' });
    }

    const success = await trabajosService.deleteTrabajo(trabajoId);
    if (!success) {
      return res.status(404).json({ message: 'Trabajo no encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting trabajo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const validateCreateTrabajo = [
  body('titulo').notEmpty().withMessage('El título es requerido'),
  body('descripcion').notEmpty().withMessage('La descripción es requerida'),
  body('imagenPrincipalUrl').notEmpty().withMessage('La URL de la imagen principal es requerida'),
];

export const validateUpdateTrabajo = [
  body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
  body('imagenPrincipalUrl')
    .optional()
    .notEmpty()
    .withMessage('La URL de la imagen principal no puede estar vacía'),
];


