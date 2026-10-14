import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
if (!process.env.CLOUDINARY_API_KEY) {
  dotenv.config();
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  dotenv.config({ path: path.resolve(__dirname, '../../../backend/.env') });
}

export const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ar5jvwgw',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  folder: process.env.CLOUDINARY_FOLDER || 'ar5jvwgw',
};

cloudinary.config({
  cloud_name: CLOUDINARY_CONFIG.cloud_name,
  api_key: CLOUDINARY_CONFIG.api_key,
  api_secret: CLOUDINARY_CONFIG.api_secret,
  secure: true,
});

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    CLOUDINARY_CONFIG.cloud_name &&
    CLOUDINARY_CONFIG.api_key &&
    CLOUDINARY_CONFIG.api_secret &&
    !CLOUDINARY_CONFIG.api_key.includes('<')
  );
};

export default cloudinary;
