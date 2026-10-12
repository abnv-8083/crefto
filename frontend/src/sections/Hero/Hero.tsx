import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { GhostType } from '../../components/GhostType/GhostType';

export const Hero: React.FC = () => {
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroContent =
    'CREFTO is the Website Development Service under ChargeEase, focused on helping businesses build a strong and professional online presence that turns ideas into powerful digital solutions.';

  return (
    <section id="home" className="hero-section hero-centered">
      {/* Background ambient lighting */}
      <div className="hero-glow hero-glow-center"></div>

      <div className="hero-container hero-container-centered">
        {/* Centered Minimal Content */}
        <div className="hero-content hero-content-centered">

          <h1 className="hero-title hero-title-centered">
            Modern Websites.<br />
            <span className="text-accent">Stronger Businesses.</span>
          </h1>

          <div className="hero-description hero-description-centered">
            <GhostType
              text={heroContent}
              typingSpeed={28}
              startDelay={500}
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
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollTo('services')}
            >
              Our Services
            </Button>
          </div>


        </div>
      </div>
    </section>
  );
};
