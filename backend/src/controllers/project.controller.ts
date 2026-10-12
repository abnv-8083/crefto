import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';

const projectService = new ProjectService();

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};
