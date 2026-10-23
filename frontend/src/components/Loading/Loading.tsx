import React, { useEffect, useState } from 'react';
import ParticleText from './ParticleText';

interface LoadingProps {
  /**
   * Called after the fade-out animation completes.
   * The parent controls WHEN to dismiss — set `dismiss` to true when ready.
   */
  onFinish?: () => void;
  /** When true, the overlay begins fading out and then calls onFinish. */
  dismiss?: boolean;
  /** @deprecated Use `dismiss` prop instead. Kept for backwards compatibility. */
  duration?: number;
}

export const Loading: React.FC<LoadingProps> = ({ onFinish, dismiss = false, duration }) => {
  const [fadingOut, setFadingOut] = useState(false);

  // Parent-driven dismiss (new behaviour)
  useEffect(() => {
    if (!dismiss || fadingOut) return;
    setFadingOut(true);
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 600);
    return () => clearTimeout(finishTimer);
  }, [dismiss, fadingOut, onFinish]);

  // Legacy self-dismiss via duration (only fires if dismiss prop is never set to true)
  useEffect(() => {
    if (dismiss || duration == null) return;
    const timer = setTimeout(() => {
      setFadingOut(true);
      const finishTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
      return () => clearTimeout(finishTimer);
    }, duration);
    return () => clearTimeout(timer);
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
