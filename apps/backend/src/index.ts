import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  // Permitir que recursos (imágenes) se consuman desde otro origen (frontend)
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  // Evitar bloqueos innecesarios al embeber recursos de otros orígenes
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes subidas) desde una ruta absoluta
// Coincide con el directorio donde multer guarda los archivos (apps/backend/uploads)
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'MD Publicidades API'
  });
});

// Routes
import authRoutes from './routes/auth.routes';
import novedadesRoutes from './routes/novedades.routes';
import uploadRoutes from './routes/upload.routes';

app.use('/api/auth', authRoutes);
app.use('/api/novedades', novedadesRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Cerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Cerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
