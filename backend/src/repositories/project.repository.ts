import { Project, IProject } from '../models/Project';
import { isDBConnected } from '../config/db';

const defaultProjects: IProject[] = [
  {
    id: '1',
    title: 'Artisan Oven & Cafe',
    category: 'Business Website',
    image: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969450/ar5jvwgw/projects/bakery-website.jpg',
    description: 'Artisanal bakery storefront and online ordering system.',
  },
  {
    id: '2',
    title: 'Apex Cloud Analytics',
    category: 'Web Application',
    image: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969452/ar5jvwgw/projects/admin-dashboard.jpg',
    description: 'Analytics and operational management platform.',
  },
  {
    id: '3',
    title: 'Nova Studio Agency',
    category: 'Business Website',
    image: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969454/ar5jvwgw/projects/nova-portfolio.jpg',
    description: 'Modern portfolio design for digital agencies and creators.',
  },
];

export class ProjectRepository {
  private memoryProjects: IProject[] = [...defaultProjects];

  async findAll(): Promise<IProject[]> {
    if (isDBConnected()) {
      try {
        const count = await Project.countDocuments();
        if (count === 0) {
          // Auto-seed default projects into MongoDB
          await Project.insertMany(
            defaultProjects.map((p) => ({
              title: p.title,
              category: p.category,
              image: p.image,
              description: p.description,
            }))
          );
        }

        const docs = await Project.find();
        return docs.map((d) => ({
          id: d._id.toString(),
          title: d.title,
          category: d.category,
          image: d.image,
          link: d.link,
          description: d.description,
          metric: d.metric,
          url: d.url,
          fullCaseStudy: d.fullCaseStudy,
          stats: d.stats,
          deliverables: d.deliverables,
          tech: d.tech,
        }));
      } catch (err) {
        console.error('[ProjectRepository] MongoDB error, returning fallback:', err);
      }
    }
    return this.memoryProjects;
  }

  async findById(id: string): Promise<IProject | null> {
    if (isDBConnected()) {
      try {
        const doc = await Project.findById(id);
        if (doc) {
          return {
            id: doc._id.toString(),
            title: doc.title,
            category: doc.category,
            image: doc.image,
            link: doc.link,
            description: doc.description,
            metric: doc.metric,
            url: doc.url,
            fullCaseStudy: doc.fullCaseStudy,
            stats: doc.stats,
            deliverables: doc.deliverables,
            tech: doc.tech,
          };
        }
      } catch {
        // Fallback below
      }
    }
    return this.memoryProjects.find((p) => p.id === id) || null;
  }
}
