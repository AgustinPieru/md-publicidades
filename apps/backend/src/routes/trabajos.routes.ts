import { Router } from 'express';
import {
  getAllTrabajos,
  getTrabajoById,
  createTrabajo,
  updateTrabajo,
  deleteTrabajo,
  validateCreateTrabajo,
  validateUpdateTrabajo,
} from '../controllers/trabajos.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getAllTrabajos);
router.get('/:id', getTrabajoById);

// Rutas protegidas (requieren autenticación)
router.post('/', authenticateToken, validateCreateTrabajo, createTrabajo);
router.put('/:id', authenticateToken, validateUpdateTrabajo, updateTrabajo);
router.delete('/:id', authenticateToken, deleteTrabajo);

export default router;


