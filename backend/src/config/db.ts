import path from 'path';
import dns from 'dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Fix for Node.js / c-ares on Windows SRV query ECONNREFUSED issue
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in case environment prohibits custom DNS
}

// Ensure environment variables are loaded regardless of execution CWD
if (!process.env.DATABASE_URL && !process.env.MONGODB_URI) {
  dotenv.config();
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  dotenv.config({ path: path.resolve(__dirname, '../../../backend/.env') });
}

// Track connection state across serverless and long-lived node invocations
let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

export const isDBConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export const connectDB = async (): Promise<typeof mongoose | null> => {
  if (isDBConnected()) {
    return mongoose;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const rawUri = process.env.DATABASE_URL || process.env.MONGODB_URI;

  if (!rawUri) {
    console.warn('[Database] Warning: Neither DATABASE_URL nor MONGODB_URI is defined in environment.');
    return null;
  }

  // Check if placeholder is present
  if (rawUri.includes('<db_password>')) {
    console.warn(
      '[Database] Notice: "<db_password>" placeholder detected in connection string.\n' +
      '           👉 Please replace "<db_password>" in your backend/.env with your actual MongoDB Atlas password.'
    );
    return null;
  }

  // Sanitize URI for safe console logging
  const maskedUri = rawUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  console.log(`[Database] Connecting to MongoDB: ${maskedUri}...`);

  connectionPromise = mongoose.connect(rawUri, {
    serverSelectionTimeoutMS: 5000,
    dbName: 'crefto',
  });

  try {
    const conn = await connectionPromise;
    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to cluster: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error: any) {
    isConnected = false;
    connectionPromise = null;
    console.error('[Database] MongoDB connection failed:', error?.message || error);
    return null;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    connectionPromise = null;
    console.log('[Database] Disconnected from MongoDB.');
  }
};

// Mongoose connection event listeners
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('[Database] Mongoose event: connected');
});

mongoose.connection.on('error', (err) => {
  console.error('[Database] Mongoose event error:', err);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  connectionPromise = null;
  console.log('[Database] Mongoose event: disconnected');
});
