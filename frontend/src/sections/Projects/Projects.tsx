import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Layers,
  Send,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/Button/Button';
import CardSwap, { Card, CardSwapRef } from '../../components/CardSwap/CardSwap';
import { useContent, IProjectItem } from '../../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export type ProjectItem = IProjectItem;

export const Projects: React.FC = () => {
  const { content } = useContent();
  const projectsData = content.projects;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<CardSwapRef>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);

  const categories = projectsData.categories || ['All', 'Business Website', 'Web Application', 'E-Commerce'];
  const allProjects: ProjectItem[] = projectsData.projects || [];

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  const activeProject = filteredProjects[activeProjectIndex % filteredProjects.length] || filteredProjects[0];

  useEffect(() => {
    setActiveProjectIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToContact = (projectName?: string) => {
    if (selectedModalProject) {
      setSelectedModalProject(null);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // If a message textarea exists, optionally focus it
      setTimeout(() => {
        const textarea = el.querySelector('textarea');
        if (textarea && projectName) {
          textarea.focus();
        }
      }, 500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedModalProject) {
        setSelectedModalProject(null);
      }
    };
    if (selectedModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedModalProject]);

  const handleCardClick = (index: number) => {
    const proj = filteredProjects[index % filteredProjects.length];
    if (proj) {
      setActiveProjectIndex(index % filteredProjects.length);
      setSelectedModalProject(proj);
    }
  };

  const handleCardChange = (index: number) => {
    setActiveProjectIndex(index % filteredProjects.length);
  };

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-ambient-glow" />

      <div className="projects-container">
        {/* Header Block */}
        <div ref={headerRef} className="projects-header-block">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">{projectsData.sectionTag}</span>
            <span className="section-tag-line" />
          </div>

          <h2 className="section-main-title">{projectsData.title}</h2>

          <p className="projects-desc">
            {projectsData.description}
          </p>

          {/* Interactive Category Filter Bar */}
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`project-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Showcase Area */}
        <div className="projects-showcase-split">
          {/* Left Column: 3D CardSwap Stack */}
          <div className="projects-swap-column">
            <div className="projects-swap-stage-wrap">
              <CardSwap
                key={activeCategory}
                ref={cardSwapRef}
                width={440}
                height={330}
                cardDistance={52}
                verticalDistance={60}
                depth={85}
                skewAmount={5}
                visibleCards={4}
                delay={4200}
                autoplay={true}
                pauseOnHover={true}
                draggable={true}
                speed={1}
                bounce={0.35}
                cardRadius={18}
                theme="dark"
                onCardClick={handleCardClick}
                onChange={handleCardChange}
              >
                {filteredProjects.map((proj) => (
                  <Card key={proj.id} className="project-custom-swap-card">
                    <div className="swap-card-inner">
                      {/* Browser Mockup Chrome Bar */}
                      <div className="swap-browser-bar">
                        <div className="swap-browser-dots">
                          <span className="s-dot red" />
                          <span className="s-dot yellow" />
                          <span className="s-dot green" />
                        </div>
                        <div className="swap-address-pill">
                          <Globe size={11} className="text-[#FF3838]" />
                          <span>{proj.url}</span>
                        </div>
                        <div className="swap-live-status">
                          <span className="live-pulsing-dot" /> LIVE
                        </div>
                      </div>

                      {/* Visual Image Media */}
                      <div className="swap-media-wrap">
                        <img src={proj.image} alt={proj.title} draggable={false} />
                        <div className="swap-media-gradient-overlay" />

                        {/* Top Impact Metric Badge */}
                        <div className="swap-metric-pill">
                          <Sparkles size={12} className="text-[#FF3838]" />
                          <span>{proj.metric}</span>
                        </div>

                        {/* Bottom Info Bar inside Card */}
                        <div className="swap-card-caption">
                          <span className="swap-category-tag">{proj.category}</span>
                          <h4 className="swap-card-title">{proj.title}</h4>
                        </div>

                        <div className="swap-click-hint">
                          <span>CLICK FOR FULL DETAILS</span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>

            {/* Controls Bar under Stack */}
            <div className="swap-controls-bar">
              <div className="swap-nav-buttons">
                <button
                  type="button"
                  className="swap-nav-btn"
                  onClick={() => cardSwapRef.current?.prev()}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="swap-nav-btn"
                  onClick={() => cardSwapRef.current?.next()}
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="swap-counter-pill">
                <span>PROJECT {String((activeProjectIndex % filteredProjects.length) + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span>
              </div>

              <div className="swap-drag-hint">
                <Layers size={13} className="text-[#FF3838]" />
                <span>DRAG TO FLING • CLICK TO INSPECT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Project Detail Dossier */}
          {activeProject && (
            <div className="projects-dossier-column">
              <div className="project-dossier-card">
                {/* Dossier Header */}
                <div className="dossier-header-bar">
                  <div className="dossier-category-badge">
                    <span className="dossier-cat-pill">{activeProject.category}</span>
                    <span className="dossier-url-pill">
                      <Globe size={11} className="text-[#FF3838]" />
                      {activeProject.url}
                    </span>
                  </div>
                  <div className="dossier-metric-chip">
                    <Sparkles size={13} className="text-[#FF3838]" />
                    <span>{activeProject.metric}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="dossier-project-title">{activeProject.title}</h3>
                <p className="dossier-project-desc">{activeProject.description}</p>

                {/* Key Deliverables */}
                <div className="dossier-deliverables-block">
                  <span className="dossier-section-label">KEY DELIVERABLES & FEATURES:</span>
                  <div className="dossier-deliverables-list">
                    {activeProject.deliverables.map((d, i) => (
                      <div key={i} className="dossier-deliverable-item">
                        <CheckCircle2 size={15} className="text-[#FF3838] shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="dossier-tech-block">
                  <span className="dossier-section-label">PRODUCTION TECH STACK:</span>
                  <div className="dossier-tech-pills">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Actions: Connect With Us & View Details */}
                <div className="dossier-actions-bar">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<Send size={16} />}
                    onClick={() => handleScrollToContact(activeProject.title)}
                  >
                    Connect With Us
                  </Button>

                  <button
                    type="button"
                    className="dossier-view-more-btn"
                    onClick={() => setSelectedModalProject(activeProject)}
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section CTA */}
        <div className="projects-bottom-cta">
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight size={18} />}
            onClick={() => handleScrollToContact()}
          >
            Connect With Us To Build Your Vision
          </Button>
        </div>
      </div>

      {/* Full Project Details Modal with Connect With Us button */}
      {selectedModalProject &&
        createPortal(
          <div
            className="project-modal-backdrop"
            onClick={() => setSelectedModalProject(null)}
          >
            <div
              className="project-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Chrome Bar */}
              <div className="modal-chrome-bar">
                <div className="modal-chrome-left">
                  <div className="modal-dots-group">
                    <span className="modal-dot red" />
                    <span className="modal-dot yellow" />
                    <span className="modal-dot green" />
                  </div>
                  <div className="modal-address-badge">
                    <Globe size={11} className="text-[#FF3838]" />
                    <span>{selectedModalProject.url}</span>
                  </div>
                  <span className="modal-top-tag">{selectedModalProject.category}</span>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedModalProject(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="modal-content-body">
                <div className="modal-grid-layout">
                  {/* Left Column: Visual Media Banner + Metrics + Tech Stack */}
                  <div className="modal-col-left">
                    <div className="modal-media-banner">
                      <img src={selectedModalProject.image} alt={selectedModalProject.title} />
                      <div className="modal-media-overlay" />
                      <div className="modal-badge-row">
                        <span className="modal-cat-tag">{selectedModalProject.category}</span>
                        <span className="modal-metric-tag">
                          <Sparkles size={12} className="text-[#FF3838]" />
                          {selectedModalProject.metric}
                        </span>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="modal-stats-grid">
                      {selectedModalProject.stats.map((st, i) => (
                        <div key={i} className="modal-stat-box">
                          <div className="modal-stat-val">{st.value}</div>
                          <div className="modal-stat-lbl">{st.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="modal-section-group">
                      <h4 className="modal-group-heading">Technology Architecture:</h4>
                      <div className="modal-tech-pills">
                        {selectedModalProject.tech.map((t) => (
                          <span key={t} className="tech-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title + Narrative + Deliverables */}
                  <div className="modal-col-right">
                    <div className="modal-project-header">
                      <div className="modal-header-meta">
                        <span className="modal-meta-category">{selectedModalProject.category}</span>
                        <span className="modal-meta-dot">•</span>
                        <span className="modal-meta-url">
                          <Globe size={11} className="text-[#FF3838]" />
                          {selectedModalProject.url}
                        </span>
                      </div>
                      <h3 className="modal-project-title">{selectedModalProject.title}</h3>
                    </div>

                    <div className="modal-case-study-box">
                      <h4 className="modal-group-heading">Case Study & Challenge:</h4>
                      <p className="modal-case-study">{selectedModalProject.fullCaseStudy}</p>
                    </div>

                    {/* Deliverables */}
                    <div className="modal-section-group">
                      <h4 className="modal-group-heading">Engineered Deliverables:</h4>
                      <div className="modal-deliverables-list">
                        {selectedModalProject.deliverables.map((item, i) => (
                          <div key={i} className="modal-del-item">
                            <CheckCircle2 size={15} className="text-[#FF3838] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Sticky Bottom CTA Bar */}
              <div className="modal-footer-cta">
                <div className="modal-footer-info">
                  <span className="modal-footer-hint">Ready to build your next flagship?</span>
                  <span className="modal-footer-sub">Partner with Crefto for end-to-end design & engineering.</span>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  icon={<Send size={16} />}
                  onClick={() => handleScrollToContact(selectedModalProject.title)}
                >
                  Connect With Us
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Projects;
