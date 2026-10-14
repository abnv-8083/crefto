import React, { useEffect, useRef, useState } from 'react';
import { Code2, Monitor, Cloud, RefreshCw, ShieldCheck, Settings, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircularCarousel from '../../components/CircularCarousel/CircularCarousel';
import { useContent } from '../../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const { content } = useContent();
  const servicesData = content.services;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);

  const serviceIcons = [
    <Code2 size={26} />,
    <Monitor size={26} />,
    <Cloud size={26} />,
    <RefreshCw size={26} />,
    <ShieldCheck size={26} />,
    <Settings size={26} />,
  ];

  const servicesList = (servicesData.services || []).map((s, idx) => ({
    ...s,
    icon: serviceIcons[idx % serviceIcons.length],
  }));

  const carouselItems = servicesList.map(s => ({ src: s.src, alt: s.alt, title: s.title, subtitle: s.subtitle }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );
      }
      if (carouselWrapRef.current) {
        gsap.fromTo(carouselWrapRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: carouselWrapRef.current, start: 'top 85%', once: true } }
        );
      }
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 55, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } }
        );
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: (i % 2 === 0 ? -12 : -24), ease: 'none',
            scrollTrigger: { trigger: gridRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCarouselChange = (index: number) => setActiveService(index);

  const handleCarouselClick = (_item: unknown, index: number) => {
    setActiveService(index);
    const cardEl = document.getElementById('service-card-' + servicesList[index].id);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      gsap.fromTo(cardEl,
        { boxShadow: '0 0 0 2px rgba(255,56,56,0), 0 20px 45px rgba(0,0,0,0.6)' },
        { boxShadow: '0 0 0 2px rgba(255,56,56,0.8), 0 20px 45px rgba(255,56,56,0.25)', duration: 0.4, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="services-container">
        <div ref={headerRef} className="section-header-block text-center">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">{servicesData.sectionTag}</span>
            <span className="section-tag-line" />
          </div>
          <h2 className="section-main-title">{servicesData.title}</h2>
          <p className="section-subtitle mx-auto">
            {servicesData.description}
          </p>
        </div>

        <div ref={carouselWrapRef} className="services-carousel-wrap">
          <CircularCarousel
            items={carouselItems}
            preset="oval"
            intro="rise"
            cardWidth={290}
            aspectRatio={0.72}
            gap={32}
            speed={10}
            autoplay="drift"
            captions
            depthFade={0.55}
            fadeColor="#070709"
            cornerRadius={18}
            parallax={0.25}
            onChange={handleCarouselChange}
            onItemClick={handleCarouselClick}
          />
          <div className="services-carousel-active-info">
            <div className="sca-num">{servicesList[activeService].num}</div>
            <p className="sca-desc">{servicesList[activeService].description}</p>
            <div className="sca-tags">
              {servicesList[activeService].tags.map((tag, i) => (
                <span key={i} className="service-tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div ref={gridRef} className="services-grid">
          {servicesList.map((service, idx) => (
            <div
              key={service.id}
              id={'service-card-' + service.id}
              className={'service-card' + (activeService === idx ? ' service-card--active' : '')}
              onClick={handleScrollToContact}
            >
              <div className="service-card-top-row">
                <div className="service-icon-wrapper">{service.icon}</div>
                <div className="service-card-top-right">
                  <span className="service-num-badge">{service.num}</span>
                  <div className="service-hover-arrow"><ArrowUpRight size={16} /></div>
                </div>
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
              <div className="service-tags-row">
                {service.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="service-tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
