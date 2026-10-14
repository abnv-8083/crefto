import { Request, Response, NextFunction } from 'express';
import { cloudinaryService } from '../services/cloudinary.service';
import { isCloudinaryConfigured, CLOUDINARY_CONFIG } from '../config/cloudinary';

export const handleUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const subfolder = (req.body.folder || req.query.folder || '') as string;

    // 1. Check if uploaded as multipart file
    if (req.file) {
      const result = await cloudinaryService.uploadBuffer(
        req.file.buffer,
        req.file.originalname,
        subfolder
      );
      res.status(200).json({
        success: true,
        message: 'Image uploaded to Cloudinary successfully',
        data: result,
      });
      return;
    }

    // 2. Check if uploaded as base64 string or remote URL in body
    const imageInput = req.body.image || req.body.dataUrl || req.body.url;
    if (imageInput && typeof imageInput === 'string') {
      const result = await cloudinaryService.uploadBase64OrUrl(imageInput, subfolder);
      res.status(200).json({
        success: true,
        message: 'Image uploaded to Cloudinary successfully',
        data: result,
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: 'No file or image data provided. Please provide a file or base64/URL.',
    });
  } catch (error) {
    next(error);
  }
};

export const handleDelete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const publicId = (req.params.publicId || req.body.publicId || req.query.publicId) as string;
    if (!publicId) {
      res.status(400).json({ success: false, message: 'publicId is required to delete an image.' });
      return;
    }

    const result = await cloudinaryService.deleteImage(publicId);
    res.status(200).json({
      success: true,
      message: 'Image deleted from Cloudinary',
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCloudinaryStatus = async (_req: Request, res: Response): Promise<void> => {
  const configured = isCloudinaryConfigured();
  const pingOk = configured ? await cloudinaryService.ping() : false;

  res.status(200).json({
    success: true,
    configured,
    cloudName: CLOUDINARY_CONFIG.cloud_name,
    folder: CLOUDINARY_CONFIG.folder,
    status: pingOk ? 'connected' : 'disconnected',
  });
};
