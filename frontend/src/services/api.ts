import { ContactFormData, ContactResponse } from '../types/contact.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit contact form');
    }

    return await response.json();
  } catch (error: any) {
    // Fallback simulation for offline/static deployment
    console.warn('API error or server offline, using local simulation:', error.message);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Thank you for reaching out! We will get back to you shortly.',
    };
  }
};

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface CloudinaryUploadResponse {
  success: boolean;
  message: string;
  data: CloudinaryUploadResult;
}

/**
 * Uploads an image File or base64 data URL to Cloudinary through the backend API.
 */
export const uploadImageToCloudinary = async (
  fileOrBase64: File | string,
  subfolder = 'projects'
): Promise<CloudinaryUploadResult> => {
  try {
    let response: Response;

    if (typeof fileOrBase64 === 'string') {
      // Send as JSON base64
      response = await fetch(`${API_BASE_URL}/upload/base64`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: fileOrBase64,
          folder: subfolder,
        }),
      });
    } else {
      // Send as FormData
      const formData = new FormData();
      formData.append('file', fileOrBase64);
      formData.append('folder', subfolder);

      response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Cloudinary upload failed.');
    }

    const json: CloudinaryUploadResponse = await response.json();
    return json.data;
  } catch (error: any) {
    console.error('[Cloudinary Upload Error]', error);
    throw error;
  }
};
