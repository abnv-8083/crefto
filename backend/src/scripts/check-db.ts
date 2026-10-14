import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../backend/.env') });

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db';

const runCheck = async () => {
  console.log('--- Crefto MongoDB Atlas Connection Test ---');
  const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ Error: DATABASE_URL is not set in backend/.env');
    process.exit(1);
  }

  if (uri.includes('<db_password>')) {
    console.warn('⚠️ Warning: "<db_password>" placeholder is still present in backend/.env!');
    console.warn('👉 Please replace "<db_password>" with your actual MongoDB Atlas database password.');
    process.exit(1);
  }

  try {
    const conn = await connectDB();
    if (conn && mongoose.connection.readyState === 1) {
      console.log('✅ Success! Connected to MongoDB Atlas:');
      console.log(`   Host: ${conn.connection.host}`);
      console.log(`   Database: ${conn.connection.name}`);
      console.log(`   ReadyState: Connected (${mongoose.connection.readyState})`);

      const collections = await mongoose.connection.db?.listCollections().toArray();
      console.log(`   Collections found: ${collections?.map((c) => c.name).join(', ') || 'None yet (will be created automatically on first insert)'}`);

      await disconnectDB();
      console.log('--- Test Complete: Database is ready ---');
      process.exit(0);
    } else {
      console.error('❌ Connection could not be established.');
      process.exit(1);
    }
  } catch (err: any) {
    console.error('❌ MongoDB Connection failed with error:', err.message || err);
    console.error('\nTroubleshooting tips:');
    console.error('1. Verify your database username and password in MongoDB Atlas (Database Access).');
    console.error('2. Make sure your IP address is allowed in Network Access (or allow 0.0.0.0/0 for anywhere).');
    console.error('3. Ensure special characters in your password are URL encoded (e.g. @ -> %40).');
    process.exit(1);
  }
};

runCheck();
