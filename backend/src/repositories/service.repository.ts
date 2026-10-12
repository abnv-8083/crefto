import { IService } from '../models/Service';

export class ServiceRepository {
  private services: IService[] = [
    {
      id: '1',
      title: 'Website Design & Development',
      description: 'Modern, responsive and user-friendly websites that represent your brand.',
      icon: 'code',
    },
    {
      id: '2',
      title: 'Business Websites',
      description: 'Professional websites for businesses, shops and service providers.',
      icon: 'monitor',
    },
    {
      id: '3',
      title: 'Web Applications',
      description: 'Custom web applications to streamline your business processes.',
      icon: 'cloud',
    },
    {
      id: '4',
      title: 'Website Redesign',
      description: 'Give your existing website a fresh, modern and better look.',
      icon: 'refresh-cw',
    },
    {
      id: '5',
      title: 'Maintenance & Support',
      description: 'Keep your website secure, updated and running smoothly.',
      icon: 'shield-check',
    },
    {
      id: '6',
      title: 'Customized Web Solutions',
      description: 'Tailored solutions to meet your unique business needs.',
      icon: 'settings',
    },
  ];

  async findAll(): Promise<IService[]> {
    return this.services;
  }
}
