import { Router } from 'express';
import { login, createAdmin, validateLogin, validateCreateAdmin } from '../controllers/auth.controller';

const router = Router();

// Rutas de autenticación
router.post('/login', validateLogin, login);
router.post('/create-admin', validateCreateAdmin, createAdmin);

export default router;


