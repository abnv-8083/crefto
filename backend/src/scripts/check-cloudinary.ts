import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../backend/.env') });

import { cloudinaryService } from '../services/cloudinary.service';
import { CLOUDINARY_CONFIG, isCloudinaryConfigured } from '../config/cloudinary';

const runCheck = async () => {
  console.log('--- Crefto Cloudinary Storage Verification ---');
  console.log(`Cloud Name : ${CLOUDINARY_CONFIG.cloud_name}`);
  console.log(`API Key    : ${CLOUDINARY_CONFIG.api_key ? CLOUDINARY_CONFIG.api_key.substring(0, 6) + '...' : 'Not set'}`);
  console.log(`Folder     : ${CLOUDINARY_CONFIG.folder}`);

  if (!isCloudinaryConfigured()) {
    console.error('❌ Cloudinary is not properly configured in backend/.env');
    process.exit(1);
  }

  try {
    console.log('\n1. Testing Cloudinary API Ping...');
    const pingOk = await cloudinaryService.ping();
    if (!pingOk) {
      console.error('❌ Cloudinary Ping failed. Check API credentials or network.');
      process.exit(1);
    }
    console.log('✅ Cloudinary Ping successful (Status: OK)');

    console.log('\n2. Testing Cloudinary Sample Image Upload...');
    // Base64 transparent 1x1 test PNG
    const testPixel =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    const uploadRes = await cloudinaryService.uploadBase64OrUrl(testPixel, 'test');
    console.log('✅ Test Upload Successful!');
    console.log(`   Public ID : ${uploadRes.public_id}`);
    console.log(`   Secure URL: ${uploadRes.secure_url}`);
    console.log(`   Format    : ${uploadRes.format}`);

    console.log('\n3. Cleaning up test image...');
    await cloudinaryService.deleteImage(uploadRes.public_id);
    console.log('✅ Test image cleaned up.');

    console.log('\n--- Cloudinary is 100% operational and ready! ---');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Cloudinary verification error:', err.message || err);
    process.exit(1);
  }
};

runCheck();
