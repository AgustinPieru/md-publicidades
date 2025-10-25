import { Router } from 'express';
import { uploadImage, deleteImage, upload } from '../controllers/upload.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Ruta para subir imagen (requiere autenticación)
router.post('/image', authenticateToken, upload.single('image'), uploadImage);

// Ruta para eliminar imagen (requiere autenticación)
router.delete('/image/:filename', authenticateToken, deleteImage);

export default router;
