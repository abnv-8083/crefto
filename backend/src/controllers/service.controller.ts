import { Request, Response, NextFunction } from 'express';
import { ServiceService } from '../services/service.service';

const serviceService = new ServiceService();

export const getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};
