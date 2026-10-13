import { Request, Response, NextFunction } from 'express';
import { contentRepository } from '../repositories/content.repository';

export const getContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const content = await contentRepository.getContent();
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await contentRepository.saveContent(req.body);
    res.status(200).json({ success: true, message: 'Content saved successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const resetContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const defaults = await contentRepository.resetContent();
    res.status(200).json({ success: true, message: 'Content reset to default', data: defaults });
  } catch (error) {
    next(error);
  }
};
