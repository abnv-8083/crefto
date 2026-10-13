import React, { useEffect, useRef } from 'react';
import { Target, Eye, Handshake, ArrowRight, CheckCircle2, TrendingUp, Award, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/Button/Button';
import MetallicPaint from '../../components/MetallicPaint/MetallicPaint';
import { useContent } from '../../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const { content } = useContent();
  const aboutData = content.about;
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance reveal for the MetallicPaint liquid metal emblem
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.88, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true
            }
          }
        );
      }

      // 4. Narrative column reveal
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 82%',
              once: true,
            }
          }
        );
      }

      // 5. Staggered feature items reveal
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll('.feature-item-card');
        gsap.fromTo(
          items,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // 6. Stats counter strip reveal
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const valueIcons = [
    <Target size={22} className="text-[#FF3838]" />,
    <Eye size={22} className="text-[#FF3838]" />,
    <Handshake size={22} className="text-[#FF3838]" />,
  ];

  const values = (aboutData.values || []).map((val, idx) => ({
    icon: valueIcons[idx % valueIcons.length],
    title: val.title,
    description: val.description,
  }));

  const statIcons = [
    <Award size={18} className="text-[#FF3838]" />,
    <TrendingUp size={18} className="text-[#FF3838]" />,
    <Clock size={18} className="text-[#FF3838]" />,
    <CheckCircle2 size={18} className="text-[#FF3838]" />,
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-container">
        {/* Left Column: Liquid Metallic Paint Brand Emblem */}
        <div className="about-visual-col">
          <div ref={visualRef} className="about-metallic-wrapper">
            <MetallicPaint
              imageSrc="/logo/logo.png"
              color="#FF3838"
              edgeBend={0.8}
              scale={0.82}
              density={2.5}
              softness={0.12}
              dispersion={0.35}
              distortion={0.06}
              speed={0.85}
              mouseTilt={0.65}
              className="about-metallic-canvas"
            />
          </div>
        </div>

        {/* Center Column: Narrative & Details */}
        <div ref={narrativeRef} className="about-text-col">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">{aboutData.sectionTag}</span>
            <span className="section-tag-line" />
          </div>

          <h2 className="section-main-title">{aboutData.title}</h2>

          <p className="about-description">{aboutData.description1}</p>

          <p className="about-description sub-desc">{aboutData.description2}</p>

          <div className="about-cta-row">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight size={16} />}
              onClick={() => handleScrollTo('services')}
            >
              {aboutData.ctaText || 'Discover Our Services'}
            </Button>
          </div>
        </div>

        {/* Right Column: Mission / Vision / ChargeEase feature items */}
        <div ref={featuresRef} className="about-features-col">
          <div className="feature-items-list">
            {values.map((item, idx) => (
              <div key={idx} className="feature-item-card">
                <div className="feature-item-icon-box">{item.icon}</div>
                <div className="feature-item-text">
                  <h3 className="feature-item-title">{item.title}</h3>
                  <p className="feature-item-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Animated Numbers Strip */}
      <div ref={statsRef} className="about-stats-banner">
        {aboutData.stats?.map((stat, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <div className="stat-separator" />}
            <div className="about-stat-box">
              <div className="stat-icon-wrap">
                {statIcons[idx % statIcons.length]}
              </div>
              <span className="stat-number">{stat.value}</span>
              <span className="stat-caption">{stat.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default About;
