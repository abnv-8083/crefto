import React, { useEffect, useRef } from 'react';
import { Zap, Layers, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from '../../components/SpotlightCard/SpotlightCard';
import { useContent } from '../../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export const Advantages: React.FC = () => {
  const { content } = useContent();
  const advantagesData = content.advantages;
  const sectionRef = useRef<HTMLElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  const cardConfig = [
    {
      spotlightColor: 'rgba(255, 56, 56, 0.45)',
      glowClass: 'glow-red',
      icon: <Zap size={22} className="text-[#FF3838]" />,
      hasSparkle: true,
      spotlightSize: 320,
      proximity: 100,
    },
    {
      spotlightColor: 'rgba(255, 70, 110, 0.45)',
      glowClass: 'glow-crimson',
      icon: <Layers size={22} className="text-[#FF3838]" />,
      hasSparkle: false,
      spotlightSize: 280,
      proximity: 90,
    },
    {
      spotlightColor: 'rgba(245, 158, 11, 0.45)',
      glowClass: 'glow-amber',
      icon: <TrendingUp size={22} className="text-[#FF3838]" />,
      hasSparkle: false,
      spotlightSize: 280,
      proximity: 90,
    },
    {
      spotlightColor: 'rgba(59, 130, 246, 0.45)',
      glowClass: 'glow-dark',
      icon: <ShieldCheck size={22} className="text-[#FF3838]" />,
      hasSparkle: false,
      spotlightSize: 320,
      proximity: 100,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bentoGridRef.current) {
        const cards = bentoGridRef.current.querySelectorAll('.bento-advantage-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardsList = advantagesData.cards || [];

  return (
    <section id="advantages" ref={sectionRef} className="advantages-section">
      <div className="advantages-container">
        {/* Header */}
        <div className="section-header-block text-center">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">{advantagesData.sectionTag}</span>
            <span className="section-tag-line" />
          </div>
          <h2 className="section-main-title">{advantagesData.title}</h2>
          <p className="section-subtitle mx-auto">
            {advantagesData.description}
          </p>
        </div>

        {/* Bento Grid with Spotlight Cards */}
        <div ref={bentoGridRef} className="bento-advantages-grid">
          {cardsList.map((card, idx) => {
            const conf = cardConfig[idx % cardConfig.length];
            const isLarge = card.isLarge ?? (idx === 0 || idx === 3);

            return (
              <SpotlightCard
                key={card.id || idx}
                className={`bento-advantage-card ${isLarge ? 'card-large' : ''}`}
                spotlightColor={conf.spotlightColor}
                intensity={0.25}
                spotlightSize={conf.spotlightSize}
                softness={0.72}
                borderGlow={0.8}
                proximity={conf.proximity}
                smoothing={0.25}
                ambient={true}
                flare={true}
              >
                <div className={`bento-card-bg-glow ${conf.glowClass}`} />
                <div className="bento-card-top">
                  <div className="bento-icon-box">{conf.icon}</div>
                  <span className="bento-metric-pill">
                    {conf.hasSparkle && <Sparkles size={11} />} {card.metric}
                  </span>
                </div>
                <div className="bento-card-body">
                  <h3 className="bento-card-title">{card.title}</h3>
                  <p className="bento-card-desc">{card.description}</p>
                  <div className="bento-tags-row">
                    {card.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="bento-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
