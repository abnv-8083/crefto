import React from 'react';
import { Code2, Monitor, Cloud, RefreshCw, ShieldCheck, Settings } from 'lucide-react';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';

export const Services: React.FC = () => {
  const servicesList = [
    {
      id: 'web-design',
      icon: <Code2 size={28} className="text-[#FF3838]" />,
      title: 'Website Design & Development',
      description: 'Modern, responsive and user-friendly websites that represent your brand.',
    },
    {
      id: 'business-websites',
      icon: <Monitor size={28} className="text-[#FF3838]" />,
      title: 'Business Websites',
      description: 'Professional websites for businesses, shops and service providers.',
    },
    {
      id: 'web-apps',
      icon: <Cloud size={28} className="text-[#FF3838]" />,
      title: 'Web Applications',
      description: 'Custom web applications to streamline your business processes.',
    },
    {
      id: 'website-redesign',
      icon: <RefreshCw size={28} className="text-[#FF3838]" />,
      title: 'Website Redesign',
      description: 'Give your existing website a fresh, modern and better look.',
    },
    {
      id: 'maintenance-support',
      icon: <ShieldCheck size={28} className="text-[#FF3838]" />,
      title: 'Maintenance & Support',
      description: 'Keep your website secure, updated and running smoothly.',
    },
    {
      id: 'customized-solutions',
      icon: <Settings size={28} className="text-[#FF3838]" />,
      title: 'Customized Web Solutions',
      description: 'Tailored solutions to meet your unique business needs.',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Header */}
        <SectionTitle
          tag="OUR SERVICES"
          title="What We Offer"
          subtitle="From simple business websites to complex web applications, we provide end-to-end web solutions tailored to your needs."
          className="services-header"
        />

        {/* 6 Services Grid */}
        <div className="services-grid">
          {servicesList.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
