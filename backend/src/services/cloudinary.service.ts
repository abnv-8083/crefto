import cloudinary, { CLOUDINARY_CONFIG, isCloudinaryConfigured } from '../config/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  original_filename?: string;
}

export class CloudinaryService {
  /**
   * Upload image buffer directly to Cloudinary via stream
   */
  async uploadBuffer(
    buffer: Buffer,
    fileName?: string,
    subfolder?: string
  ): Promise<UploadResult> {
    if (!isCloudinaryConfigured()) {
      throw new Error('Cloudinary credentials are not configured.');
    }

    const folder = subfolder
      ? `${CLOUDINARY_CONFIG.folder}/${subfolder}`
      : CLOUDINARY_CONFIG.folder;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          quality: 'auto',
          fetch_format: 'auto',
          filename_override: fileName,
          use_filename: Boolean(fileName),
          unique_filename: true,
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(error || new Error('Upload failed with no result.'));
          }
          resolve({
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            original_filename: result.original_filename,
          });
        }
      );

      const readable = new Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  /**
   * Upload base64 data URL or external URL directly to Cloudinary
   */
  async uploadBase64OrUrl(
    dataUriOrUrl: string,
    subfolder?: string
  ): Promise<UploadResult> {
    if (!isCloudinaryConfigured()) {
      throw new Error('Cloudinary credentials are not configured.');
    }

    const folder = subfolder
      ? `${CLOUDINARY_CONFIG.folder}/${subfolder}`
      : CLOUDINARY_CONFIG.folder;

    const result = await cloudinary.uploader.upload(dataUriOrUrl, {
      folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    });

    return {
      url: result.url,
      secure_url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      original_filename: result.original_filename,
    };
  }

  /**
   * Delete image from Cloudinary by public ID
   */
  async deleteImage(publicId: string): Promise<{ result: string }> {
    if (!isCloudinaryConfigured()) {
      throw new Error('Cloudinary credentials are not configured.');
    }
    return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  }

  /**
   * Test Cloudinary API connectivity
   */
  async ping(): Promise<boolean> {
    try {
      const res = await cloudinary.api.ping();
      return res.status === 'ok';
    } catch (err) {
      console.error('[CloudinaryService] Ping failed:', err);
      return false;
    }
  }
}

export const cloudinaryService = new CloudinaryService();
