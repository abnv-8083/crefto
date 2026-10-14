import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';
import projectRoutes from './routes/project.routes';
import serviceRoutes from './routes/service.routes';
import contentRoutes from './routes/content.routes';
import uploadRoutes from './routes/upload.routes';
import { errorHandler } from './middlewares/error.middleware';
import { connectDB, isDBConnected } from './config/db';
import { isCloudinaryConfigured } from './config/cloudinary';

export const createApp = (): Application => {
  const app: Application = express();

  // Middlewares
  app.use(
    cors({
      origin: process.env.CLIENT_URL || '*',
      credentials: true,
    })
  );
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Ensure DB connection is initiated (crucial for serverless environments like Vercel)
  app.use(async (_req, _res, next) => {
    try {
      await connectDB();
    } catch {
      // Continue even if DB connection is in progress
    }
    next();
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      database: isDBConnected() ? 'connected' : 'disconnected',
      cloudinary: isCloudinaryConfigured() ? 'configured' : 'missing_credentials',
      timestamp: new Date(),
    });
  });

  // API Routes
  app.use('/api/contact', contactRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/content', contentRoutes);
  app.use('/api/upload', uploadRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
