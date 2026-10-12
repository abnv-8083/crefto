import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';
import projectRoutes from './routes/project.routes';
import serviceRoutes from './routes/service.routes';
import { errorHandler } from './middlewares/error.middleware';

export const createApp = (): Application => {
  const app: Application = express();

  // Middlewares
  app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
  });

  // API Routes
  app.use('/api/contact', contactRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/services', serviceRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
