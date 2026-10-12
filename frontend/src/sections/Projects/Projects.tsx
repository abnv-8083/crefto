import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../../components/Button/Button';

export const Projects: React.FC = () => {
  const projects = [
    {
      id: 'bakery-website',
      title: 'Bakery Website',
      category: 'Business Website',
      heroSnippet: 'Freshly Baked With Love',
      bgType: 'bakery',
      description: 'An enticing and modern online storefront for an artisan bakery.',
    },
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      category: 'Web Application',
      heroSnippet: 'Analytics & Insights',
      bgType: 'dashboard',
      description: 'Comprehensive business analytics and user management dashboard.',
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      category: 'Business Website',
      heroSnippet: 'Build Your Dream Website',
      bgType: 'portfolio',
      description: 'A high-converting personal branding and agency portfolio site.',
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Left Header / Pitch */}
        <div className="projects-intro-col">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">OUR PROJECTS</span>
            <span className="section-tag-line"></span>
          </div>

          <h2 className="section-main-title">Our Work</h2>

          <p className="projects-desc">
            Here are some of the projects we've built for our clients. Each project is a step towards their growth.
          </p>

          <div className="projects-cta-box">
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View All Projects
            </Button>
          </div>
        </div>

        {/* Right Cards Showcase */}
        <div className="projects-cards-col">
          <div className="projects-cards-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="project-card-item">
                {/* Visual Thumbnail */}
                <div className={`project-thumbnail-wrapper thumb-${proj.bgType}`}>
                  <div className="thumb-overlay">
                    <span className="thumb-snippet">{proj.heroSnippet}</span>
                  </div>

                  {proj.bgType === 'bakery' && (
                    <div className="bakery-illustration">
                      <div className="pastry-badge">🥖 Artisanal Bakery</div>
                      <div className="pastry-croissant">🥐</div>
                    </div>
                  )}

                  {proj.bgType === 'dashboard' && (
                    <div className="dashboard-illustration">
                      <div className="dash-sidebar">
                        <div className="dash-bar"></div>
                        <div className="dash-bar short"></div>
                      </div>
                      <div className="dash-content">
                        <div className="dash-chart-bars">
                          <span style={{ height: '40%' }}></span>
                          <span style={{ height: '70%' }}></span>
                          <span style={{ height: '55%' }}></span>
                          <span style={{ height: '90%' }}></span>
                          <span style={{ height: '65%' }}></span>
                        </div>
                      </div>
                    </div>
                  )}

                  {proj.bgType === 'portfolio' && (
                    <div className="portfolio-illustration">
                      <div className="port-header">
                        <div className="port-dot red"></div>
                        <div className="port-dot yellow"></div>
                        <div className="port-dot green"></div>
                      </div>
                      <div className="port-cta-pill">Dream Studio</div>
                    </div>
                  )}
                </div>

                {/* Card Meta Footer */}
                <div className="project-info-row">
                  <h3 className="project-name">{proj.title}</h3>
                  <span className="project-category-badge">{proj.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
