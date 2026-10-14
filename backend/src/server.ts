import path from 'path';
import dotenv from 'dotenv';

// Load .env from multiple standard locations
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../backend/.env') });

import { createApp } from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (err: any) {
    console.warn('[Crefto Server] Initial database connection check note:', err?.message || err);
  }

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`[Crefto Server] Running on http://localhost:${PORT}`);
    console.log(`[Crefto Server] Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch((err) => {
  console.error('[Crefto Server] Fatal error starting server:', err);
  process.exit(1);
});
