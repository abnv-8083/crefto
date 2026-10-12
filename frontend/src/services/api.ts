import { ContactFormData, ContactResponse } from '../types/contact.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
