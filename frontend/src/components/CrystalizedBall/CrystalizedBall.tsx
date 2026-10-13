// CrystalizedBall component (React Bits)
import React, { useEffect, useRef } from 'react';
import './CrystalizedBall.css';

export interface CrystalizedBallProps {
  preset?: string;
  color?: string;
  theme?: string;
  size?: number;
  strands?: number;
  crackle?: number;
  flares?: number;
  glow?: number;
  sparks?: number;
  particleCount?: number;
  fill?: number;
  motion?: string;
  particleShape?: string;
  depth?: number;
  sway?: number;
  twinkle?: number;
  haze?: number;
  speed?: number;
  dustSpeed?: number;
  interactive?: boolean;
  hoverStrength?: number;
  intro?: boolean;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const BALL_PRESETS: Record<string, {
  color: string;
  strands: number;
  crackle: number;
  flares: number;
  glow: number;
  sparks: number;
  particleCount: number;
  fill: number;
  motion: string;
  particleShape: string;
  depth: number;
  sway: number;
  twinkle: number;
  haze: number;
  dustSpeed: number;
}> = {
  plasma: {
    color: '#F25BD0',
    strands: 6,
    crackle: 0.85,
    flares: 0.65,
    glow: 0.9,
    sparks: 0.6,
    particleCount: 15000,
    fill: 0.5,
    motion: 'rise',
    particleShape: 'square',
    depth: 0.6,
    sway: 0.5,
    twinkle: 0.5,
    haze: 0.7,
    dustSpeed: 1
  }
};

const CrystalizedBall: React.FC<CrystalizedBallProps> = ({
  preset = 'plasma',
  color,
  theme = 'dark',
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const base = BALL_PRESETS[preset] || BALL_PRESETS.plasma;
  const tint = color || base.color;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.style.background = theme === 'dark' ? 'radial-gradient(circle, rgba(132, 5, 37, 0.25) 0%, rgba(10, 10, 10, 0) 70%)' : '#fff';
  }, [theme, tint]);

  return (
    <div ref={containerRef} className={`crystalized-ball ${className}`.trim()} style={style} />
  );
};

export default CrystalizedBall;

