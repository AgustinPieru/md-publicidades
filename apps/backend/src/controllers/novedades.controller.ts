import { Request, Response } from 'express';
import { NovedadesService } from '../services/novedades.service';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient();
const novedadesService = new NovedadesService(prisma);

export const getAllNovedades = async (req: Request, res: Response) => {
  try {
    const novedades = await novedadesService.getAllNovedades();
    return res.json(novedades);
  } catch (error) {
    console.error('Error getting novedades:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getNovedadesRSE = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    const novedades = await novedadesService.getNovedadesRSE(limit);
    return res.json(novedades);
  } catch (error) {
    console.error('Error getting novedades RSE:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getNovedadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const novedadId = parseInt(id);

    if (isNaN(novedadId)) {
      return res.status(400).json({ message: 'ID de novedad inválido' });
    }

    const novedad = await novedadesService.getNovedadById(novedadId);
    if (!novedad) {
      return res.status(404).json({ message: 'Novedad no encontrada' });
    }

    return res.json(novedad);
  } catch (error) {
    console.error('Error getting novedad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createNovedad = async (req: Request, res: Response) => {
  try {
    console.log('📝 CreateNovedad - Datos recibidos:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Errores de validación:', errors.array());
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { titulo, descripcion, imagenUrl, esRSE } = req.body;
    const novedad = await novedadesService.createNovedad({
      titulo,
      descripcion,
      imagenUrl,
      esRSE: esRSE || false,
    });

    return res.status(201).json(novedad);
  } catch (error) {
    console.error('Error creating novedad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateNovedad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const novedadId = parseInt(id);

    if (isNaN(novedadId)) {
      return res.status(400).json({ message: 'ID de novedad inválido' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { titulo, descripcion, imagenUrl, esRSE } = req.body;
    const updateData: any = {};
    
    if (titulo !== undefined) updateData.titulo = titulo;
    if (descripcion !== undefined) updateData.descripcion = descripcion;
    if (imagenUrl !== undefined) updateData.imagenUrl = imagenUrl;
    if (esRSE !== undefined) updateData.esRSE = esRSE;

    const novedad = await novedadesService.updateNovedad(novedadId, updateData);
    if (!novedad) {
      return res.status(404).json({ message: 'Novedad no encontrada' });
    }

    return res.json(novedad);
  } catch (error) {
    console.error('Error updating novedad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteNovedad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const novedadId = parseInt(id);

    if (isNaN(novedadId)) {
      return res.status(400).json({ message: 'ID de novedad inválido' });
    }

    const success = await novedadesService.deleteNovedad(novedadId);
    if (!success) {
      return res.status(404).json({ message: 'Novedad no encontrada' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting novedad:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Validators
export const validateCreateNovedad = [
  body('titulo').notEmpty().withMessage('El título es requerido'),
  body('descripcion').notEmpty().withMessage('La descripción es requerida'),
  body('imagenUrl').notEmpty().withMessage('La URL de imagen es requerida'),
];

export const validateUpdateNovedad = [
  body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
  body('imagenUrl').optional().notEmpty().withMessage('La URL de imagen no puede estar vacía'),
];
