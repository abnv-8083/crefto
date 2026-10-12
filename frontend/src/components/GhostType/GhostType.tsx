import React, { useState, useEffect } from 'react';
import './GhostType.css';

interface GhostTypeProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  pauseDuration?: number;
  loop?: boolean;
  cursorChar?: string;
  cursorColor?: string;
  showGhost?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GhostType: React.FC<GhostTypeProps> = ({
  text,
  typingSpeed = 32,
  startDelay = 600,
  pauseDuration = 4000,
  loop = false,
  cursorChar = '|',
  cursorColor = '#FF3838',
  showGhost = true,
  className = '',
  style,
}) => {
  const [charIndex, setCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay, text]);

  useEffect(() => {
    if (!isStarted) return;

    if (charIndex < text.length) {
      // Natural slight jitter in typing speed for AI ghost feel
      const jitter = Math.floor(Math.random() * 20) - 10;
      const speed = Math.max(15, typingSpeed + jitter);

      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (loop) {
      const restartTimer = setTimeout(() => {
        setCharIndex(0);
      }, pauseDuration);

      return () => clearTimeout(restartTimer);
    }
  }, [charIndex, isStarted, text, typingSpeed, loop, pauseDuration]);

  const typedPart = text.slice(0, charIndex);
  const ghostPart = showGhost ? text.slice(charIndex) : '';

  return (
    <span className={`ghost-type-container ${className}`} style={style}>
      <span className="ghost-type-typed">{typedPart}</span>
      <span className="ghost-type-cursor" style={{ color: cursorColor }}>
        {cursorChar}
      </span>
      {showGhost && <span className="ghost-type-ghost">{ghostPart}</span>}
    </span>
  );
};

export default GhostType;
