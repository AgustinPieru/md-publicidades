import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { ServiciosService } from '../services/servicios.service';

const prisma = new PrismaClient();
const serviciosService = new ServiciosService(prisma);

export const getAllServicios = async (req: Request, res: Response) => {
  try {
    const servicios = await serviciosService.getAllServicios();
    return res.json(servicios);
  } catch (error) {
    console.error('Error getting servicios:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getServicioByTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const servicio = await serviciosService.getServicioByTipo(tipo);
    
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    
    return res.json(servicio);
  } catch (error) {
    console.error('Error getting servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateServicio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { tipo } = req.params;
    const servicio = await serviciosService.updateServicio(tipo, req.body);
    return res.json(servicio);
  } catch (error) {
    console.error('Error updating servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deletePdf = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const servicio = await serviciosService.deletePdf(tipo);
    return res.json(servicio);
  } catch (error) {
    console.error('Error deleting PDF:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateServicioValidation = [
  body('nombre').optional().isString().trim().notEmpty(),
  body('pdfUrl').optional().isString().trim(),
  body('descripcion').optional().isString().trim(),
];
