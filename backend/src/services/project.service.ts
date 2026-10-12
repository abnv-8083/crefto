import { ProjectRepository } from '../repositories/project.repository';
import { IProject } from '../models/Project';

export class ProjectService {
  private projectRepo: ProjectRepository;

  constructor() {
    this.projectRepo = new ProjectRepository();
  }

  async getAllProjects(): Promise<IProject[]> {
    return this.projectRepo.findAll();
  }

  async getProjectById(id: string): Promise<IProject | null> {
    return this.projectRepo.findById(id);
  }
}
