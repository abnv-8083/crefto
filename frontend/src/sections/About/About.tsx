import React from 'react';
import { Target, Eye, Handshake, ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import CrystalizedBall from '../../components/CrystalizedBall/CrystalizedBall';


export const About: React.FC = () => {
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const values = [
    {
      icon: <Target size={24} className="text-[#FF3838]" />,
      title: 'Our Mission',
      description: 'To deliver high-quality web solutions that help businesses grow online.',
    },
    {
      icon: <Eye size={24} className="text-[#FF3838]" />,
      title: 'Our Vision',
      description: 'To be a trusted web development partner for every business, big or small.',
    },
    {
      icon: <Handshake size={24} className="text-[#FF3838]" />,
      title: 'Under ChargeEase',
      description: 'CREFTO is a part of ChargeEase, bringing the power of technology and innovation together.',
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Left Column: Glowing Circular Radar Emblem */}
        <div className="about-visual-col">
          <div className="crystal-ball-wrapper" style={{ position: "relative", width: "100%", height: "100%" }}>
  <CrystalizedBall
    preset="plasma"
    color="#840525"
    size={0.7}
    crackle={0.85}
    fill={0.5}
    interactive
    hoverStrength={0.7}
  />
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#ffffff",
      fontSize: "clamp(2rem,5vw,4rem)",
      fontWeight: 800,
      pointerEvents: "none",
    }}
  >
    crefto
  </div>
</div>
        </div>

        {/* Center Column: Narrative & Details */}
        <div className="about-text-col">
          <div className="section-tag-wrapper">
            <span className="section-tag-text">ABOUT US</span>
            <span className="section-tag-line"></span>
          </div>

          <h2 className="section-main-title">About Crefto</h2>

          <p className="about-description">
            CREFTO is the Website Development Service under ChargeEase, focused on helping businesses build a strong and professional online presence. We create modern, responsive and user-friendly websites and web applications that turn your ideas into powerful digital solutions.
          </p>

          <div className="about-cta-row">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight size={16} />}
              onClick={() => handleScrollTo('services')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Column: Mission / Vision / ChargeEase feature items */}
        <div className="about-features-col">
          <div className="feature-items-list">
            {values.map((item, idx) => (
              <div key={idx} className="feature-item-card">
                <div className="feature-item-icon-box">
                  {item.icon}
                </div>
                <div className="feature-item-text">
                  <h3 className="feature-item-title">{item.title}</h3>
                  <p className="feature-item-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
