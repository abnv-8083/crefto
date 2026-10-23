import React, { useEffect, useRef, useState } from 'react';
import ParticleText from './ParticleText';

interface LoadingProps {
  /** Called after the fade-out animation completes. */
  onFinish?: () => void;
  /** When true the overlay begins fading out, then calls onFinish. */
  dismiss?: boolean;
  /** @deprecated Use dismiss prop instead. */
  duration?: number;
}

export const Loading: React.FC<LoadingProps> = ({ onFinish, dismiss = false, duration }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const dismissed = useRef(false); // guard so we only start the fade once

  useEffect(() => {
    if (!dismiss || dismissed.current) return;
    dismissed.current = true;
    setFadingOut(true);

    const id = setTimeout(() => {
      onFinish?.();
    }, 600);

    return () => clearTimeout(id);
    // intentionally only re-run when dismiss flips to true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismiss]);

  // Legacy self-dismiss via duration (only used when dismiss prop is not provided)
  useEffect(() => {
    if (dismissed.current || duration == null) return;

    const id = setTimeout(() => {
      if (dismissed.current) return;
      dismissed.current = true;
      setFadingOut(true);

      const finishId = setTimeout(() => {
        onFinish?.();
      }, 600);

      return () => clearTimeout(finishId);
    }, duration);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

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
