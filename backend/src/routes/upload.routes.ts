import { Router } from 'express';
import multer from 'multer';
import { handleUpload, handleDelete, getCloudinaryStatus } from '../controllers/upload.controller';

const router = Router();

// Configure in-memory storage so files are streamed straight to Cloudinary without writing to disk
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (PNG, JPG, WebP, SVG, GIF) are allowed.'));
    }
  },
});

// Upload route supports single file in field 'file' or 'image'
router.post('/', upload.single('file'), handleUpload);
router.post('/base64', handleUpload);
router.get('/status', getCloudinaryStatus);
router.delete('/:publicId(*)', handleDelete);

export default router;
