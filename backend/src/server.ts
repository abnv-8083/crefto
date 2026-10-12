import dotenv from 'dotenv';
import { createApp } from './app';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`[Crefto Server] Running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('[Crefto Server] Fatal error starting server:', err);
  process.exit(1);
});
