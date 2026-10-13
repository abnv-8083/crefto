import React, { useEffect, useRef } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '../../components/Button/Button';
import { GhostType } from '../../components/GhostType/GhostType';
import { FoldText } from '../../components/FoldText/FoldText';
import { useContent } from '../../context/ContentContext';

interface HeroProps {
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded = true }) => {
  const { content } = useContent();
  const heroData = content.hero;
  const heroRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroContent = heroData.description;

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Reveal pill badge
      if (pillRef.current) {
        gsap.fromTo(
          pillRef.current,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: 'back.out(1.5)' }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section id="home" ref={heroRef} className="hero-section hero-centered">
      {/* Animated Gradient Background */}
      <div className="hero-gradient-bg" aria-hidden="true" />

      {/* Background ambient lighting and subtle blueprint grid */}
      <div className="hero-glow hero-glow-center" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="hero-container hero-container-centered">
        {/* Status Pill */}
        <div ref={pillRef} className="hero-status-pill">
          <span className="status-indicator-dot" />
          <span className="status-pill-text">{heroData.statusPill}</span>
          <span className="status-pill-sub">{heroData.statusPillSub}</span>
        </div>

        {/* Centered Minimal Content */}
        <div className="hero-content hero-content-centered">
          <h1 className="hero-title hero-title-centered">
            <FoldText
              text={heroData.headlinePart1}
              splitBy="char"
              hinge="top"
              trigger="mount"
              start={isLoaded}
              duration={0.65}
              stagger={0.035}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontWeight={800}
              color="#ffffff"
            />
            <br />
            <FoldText
              text={heroData.headlinePart2}
              splitBy="char"
              hinge="top"
              trigger="mount"
              start={isLoaded}
              delay={0.25}
              duration={0.65}
              stagger={0.035}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontWeight={800}
              className="text-accent hero-fold-accent"
            />
          </h1>

          <div className="hero-description hero-description-centered">
            <GhostType
              text={heroContent}
              start={isLoaded}
              typingSpeed={25}
              startDelay={800}
              cursorChar="|"
              cursorColor="#FF3838"
              showGhost={true}
              loop={false}
            />
          </div>

          <div className="hero-buttons hero-buttons-centered">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              onClick={() => handleScrollTo('contact')}
            >
              {heroData.primaryCtaText || 'Connect With Us'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Eye size={17} />}
              onClick={() => handleScrollTo('projects')}
            >
              {heroData.secondaryCtaText || 'Explore Work'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
