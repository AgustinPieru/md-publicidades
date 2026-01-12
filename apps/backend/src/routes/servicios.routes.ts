import { Router } from 'express';
import { 
  getAllServicios, 
  getServicioByTipo, 
  updateServicio, 
  deletePdf,
  updateServicioValidation 
} from '../controllers/servicios.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getAllServicios);
router.get('/:tipo', getServicioByTipo);

// Rutas protegidas (requieren autenticación)
router.put('/:tipo', authenticateToken, updateServicioValidation, updateServicio);
router.delete('/:tipo/pdf', authenticateToken, deletePdf);

export default router;
