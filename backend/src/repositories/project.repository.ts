import { IProject } from '../models/Project';

export class ProjectRepository {
  private projects: IProject[] = [
    {
      id: '1',
      title: 'Bakery Website',
      category: 'Business Website',
      image: '/images/bakery.jpg',
      description: 'Artisanal bakery storefront and online ordering system.',
    },
    {
      id: '2',
      title: 'Admin Dashboard',
      category: 'Web Application',
      image: '/images/dashboard.jpg',
      description: 'Analytics and operational management platform.',
    },
    {
      id: '3',
      title: 'Portfolio Website',
      category: 'Business Website',
      image: '/images/portfolio.jpg',
      description: 'Modern portfolio design for digital agencies and creators.',
    },
  ];

  async findAll(): Promise<IProject[]> {
    return this.projects;
  }

  async findById(id: string): Promise<IProject | null> {
    return this.projects.find((p) => p.id === id) || null;
  }
}
