import { Service, IService } from '../models/Service';
import { isDBConnected } from '../config/db';

const defaultServices: IService[] = [
  {
    id: '1',
    title: 'Website Design & Development',
    description: 'Modern, responsive and user-friendly websites that represent your brand.',
    icon: 'code',
    src: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969441/ar5jvwgw/services/web-design.jpg',
  },
  {
    id: '2',
    title: 'Business Websites',
    description: 'Professional websites for businesses, shops and service providers.',
    icon: 'monitor',
    src: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969442/ar5jvwgw/services/business-websites.jpg',
  },
  {
    id: '3',
    title: 'Web Applications',
    description: 'Custom web applications to streamline your business processes.',
    icon: 'cloud',
    src: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969444/ar5jvwgw/services/web-apps.jpg',
  },
  {
    id: '4',
    title: 'Website Redesign',
    description: 'Give your existing website a fresh, modern and better look.',
    icon: 'refresh-cw',
    src: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969446/ar5jvwgw/services/website-redesign.jpg',
  },
  {
    id: '5',
    title: 'Maintenance & Support',
    description: 'Keep your website secure, updated and running smoothly.',
    icon: 'shield-check',
    src: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969447/ar5jvwgw/services/maintenance-support.jpg',
  },
  {
    id: '6',
    title: 'Customized Web Solutions',
    description: 'Tailored solutions to meet your unique business needs.',
    icon: 'settings',
    src: 'https://res.cloudinary.com/ar5jvwgw/image/upload/v1791969449/ar5jvwgw/services/customized-solutions.jpg',
  },
];

export class ServiceRepository {
  private memoryServices: IService[] = [...defaultServices];

  async findAll(): Promise<IService[]> {
    if (isDBConnected()) {
      try {
        const count = await Service.countDocuments();
        if (count === 0) {
          // Auto-seed default services into MongoDB
          await Service.insertMany(
            defaultServices.map((s) => ({
              title: s.title,
              description: s.description,
              icon: s.icon,
            }))
          );
        }

        const docs = await Service.find();
        return docs.map((d) => ({
          id: d._id.toString(),
          title: d.title,
          description: d.description,
          icon: d.icon,
          subtitle: d.subtitle,
          tags: d.tags,
          src: d.src,
          alt: d.alt,
          num: d.num,
        }));
      } catch (err) {
        console.error('[ServiceRepository] MongoDB error, returning fallback:', err);
      }
    }
    return this.memoryServices;
  }
}
