import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../backend/.env') });

import { connectDB, disconnectDB } from '../config/db';
import cloudinary, { CLOUDINARY_CONFIG } from '../config/cloudinary';
import { defaultSiteContent } from '../data/defaultContent';
import { SiteContent, ISiteContent } from '../models/Content';
import { Project } from '../models/Project';
import { Service } from '../models/Service';

const uploadToCloudinary = async (
  remoteUrl: string,
  folder: string,
  publicId: string
): Promise<string> => {
  console.log(`  ⬆️ Uploading to Cloudinary [${folder}/${publicId}]...`);
  try {
    const res = await cloudinary.uploader.upload(remoteUrl, {
      folder: `${CLOUDINARY_CONFIG.folder}/${folder}`,
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    });
    console.log(`  ✅ Done: ${res.secure_url}`);
    return res.secure_url;
  } catch (err: any) {
    console.error(`  ❌ Failed uploading ${publicId}:`, err.message || err);
    return remoteUrl; // Fallback to original URL if upload fails
  }
};

const runMigration = async () => {
  console.log('====================================================');
  console.log('🚀 Crefto Data Migration: Cloudinary & MongoDB Atlas');
  console.log('====================================================');

  await connectDB();

  // Deep clone default site content
  const contentCopy: ISiteContent = JSON.parse(JSON.stringify(defaultSiteContent));

  console.log('\n--- 1. Uploading Services Images to Cloudinary ---');
  for (let i = 0; i < contentCopy.services.services.length; i++) {
    const item = contentCopy.services.services[i];
    const originalUrl = item.src;
    console.log(`Service [${item.id}]: ${item.title}`);
    const cloudinaryUrl = await uploadToCloudinary(originalUrl, 'services', item.id);
    contentCopy.services.services[i].src = cloudinaryUrl;
  }

  console.log('\n--- 2. Uploading Project Showcase Images to Cloudinary ---');
  for (let i = 0; i < contentCopy.projects.projects.length; i++) {
    const proj = contentCopy.projects.projects[i];
    const originalUrl = proj.image;
    console.log(`Project [${proj.id}]: ${proj.title}`);
    const cloudinaryUrl = await uploadToCloudinary(originalUrl, 'projects', proj.id);
    contentCopy.projects.projects[i].image = cloudinaryUrl;
  }

  console.log('\n--- 3. Storing Full Site Content into MongoDB Atlas ---');
  await SiteContent.findOneAndUpdate(
    { key: 'global' },
    { key: 'global', data: contentCopy },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log('✅ Global site content saved to MongoDB Atlas (`sitecontents` collection).');

  console.log('\n--- 4. Storing Projects into MongoDB Atlas (`projects` collection) ---');
  await Project.deleteMany({});
  const projectsToInsert = contentCopy.projects.projects.map((p) => ({
    title: p.title,
    category: p.category,
    image: p.image,
    description: p.description,
    metric: p.metric,
    url: p.url,
    fullCaseStudy: p.fullCaseStudy,
    stats: p.stats,
    deliverables: p.deliverables,
    tech: p.tech,
  }));
  await Project.insertMany(projectsToInsert);
  console.log(`✅ ${projectsToInsert.length} Projects inserted into MongoDB Atlas.`);

  console.log('\n--- 5. Storing Services into MongoDB Atlas (`services` collection) ---');
  await Service.deleteMany({});
  const servicesToInsert = contentCopy.services.services.map((s) => ({
    title: s.title,
    subtitle: s.subtitle,
    description: s.description,
    src: s.src,
    alt: s.alt,
    num: s.num,
    tags: s.tags,
  }));
  await Service.insertMany(servicesToInsert);
  console.log(`✅ ${servicesToInsert.length} Services inserted into MongoDB Atlas.`);

  console.log('\n====================================================');
  console.log('🎉 Migration Complete! All data and images are in the cloud.');
  console.log('====================================================');

  await disconnectDB();
  process.exit(0);
};

runMigration().catch(async (err) => {
  console.error('Fatal migration error:', err);
  await disconnectDB();
  process.exit(1);
});
