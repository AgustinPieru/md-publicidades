import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { uploadImage, deleteImage, upload, uploadPdfFile, uploadPdf, deletePdf } from '../controllers/upload.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Middleware para manejar errores de multer
const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        message: 'El archivo es demasiado grande. El tamaño máximo permitido es 20MB' 
      });
    }
    return res.status(400).json({ 
      message: `Error al procesar el archivo: ${err.message}` 
    });
  }
  
  if (err) {
    // Error del fileFilter u otro error
    return res.status(400).json({ 
      message: err.message || 'Error al procesar el archivo' 
    });
  }
  
  return next();
};

// Wrapper para manejar errores de multer en la ruta de upload de imágenes
const uploadWithErrorHandling = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next);
    }
    next();
  });
};

// Wrapper para manejar errores de multer en la ruta de upload de PDFs
const uploadPdfWithErrorHandling = (req: Request, res: Response, next: NextFunction) => {
  uploadPdf.single('pdf')(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next);
    }
    next();
  });
};

// Ruta para subir imagen (requiere autenticación)
router.post('/image', authenticateToken, uploadWithErrorHandling, uploadImage);

// Ruta para subir PDF (requiere autenticación)
router.post('/pdf', authenticateToken, uploadPdfWithErrorHandling, uploadPdfFile);

// Ruta para eliminar imagen (requiere autenticación)
router.delete('/image/:filename', authenticateToken, deleteImage);

// Ruta para eliminar PDF (requiere autenticación)
router.delete('/pdf/:filename', authenticateToken, deletePdf);

export default router;
