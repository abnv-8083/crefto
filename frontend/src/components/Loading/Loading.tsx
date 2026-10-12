import React, { useEffect, useState } from 'react';
import ParticleText from './ParticleText';

interface LoadingProps {
  onFinish?: () => void;
  duration?: number;
}

export const Loading: React.FC<LoadingProps> = ({ onFinish, duration = 4000 }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      const finishTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
      return () => clearTimeout(finishTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <div className={`loading-screen-overlay ${fadingOut ? 'fade-out' : ''}`}>
      <div className="loading-content-box">
        <div style={{ width: '100%', height: 360, background: '#09090f', position: 'relative' }}>
          <ParticleText
            text="crefto"
            particleSize={2}
            density={4}
            color="#ffffff"
            highlightColor="#d90b37"
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0.7}
            trigger="hover"
            fontSize="clamp(3rem, 12vw, 8rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
          />
        </div>

        <div className="loading-meta-status">
          <div className="loading-progress-track">
            <div className="loading-progress-bar"></div>
          </div>
          <span className="loading-tagline">WE BUILD YOUR DIGITAL PRESENCE</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
