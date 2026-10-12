import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';

const contactService = new ContactService();

export const handleContactForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    const result = await contactService.processContactSubmission({ name, email, message });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
