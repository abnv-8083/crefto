import React from 'react';
import { Sparkles } from 'lucide-react';
import './MarqueeTicker.css';
import { useContent } from '../../context/ContentContext';

interface MarqueeTickerProps {
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ className = '' }) => {
  const { content } = useContent();
  const tickerItems = content.marquee?.items?.length ? content.marquee.items : [
    'BESPOKE WEB DEVELOPMENT',
    'THREE.JS 3D EXPERIENCES',
    'GSAP MOTION DESIGN',
    'HIGH-CONVERSION E-COMMERCE',
    'NEXT.JS & REACT ARCHITECTURE',
    'SUB-SECOND PERFORMANCE',
  ];

  return (
    <div className={`marquee-ticker-wrapper ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {/* First track copy */}
        <div className="marquee-content">
          {tickerItems.map((item, idx) => (
            <span key={`t1-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <Sparkles size={14} className="marquee-star" />
            </span>
          ))}
        </div>
        {/* Second track copy for seamless loop */}
        <div className="marquee-content" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <span key={`t2-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <Sparkles size={14} className="marquee-star" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
