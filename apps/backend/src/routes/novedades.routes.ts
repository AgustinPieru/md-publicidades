import { Router } from 'express';
import {
  getAllNovedades,
  getNovedadesRSE,
  getNovedadById,
  createNovedad,
  updateNovedad,
  deleteNovedad,
  validateCreateNovedad,
  validateUpdateNovedad,
} from '../controllers/novedades.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getAllNovedades);
router.get('/rse', getNovedadesRSE);
router.get('/:id', getNovedadById);

// Rutas protegidas (requieren autenticación)
router.post('/', authenticateToken, validateCreateNovedad, createNovedad);
router.put('/:id', authenticateToken, validateUpdateNovedad, updateNovedad);
router.delete('/:id', authenticateToken, deleteNovedad);

export default router;


