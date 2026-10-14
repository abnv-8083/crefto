import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'title' | 'rectangular' | 'circular' | 'pill' | 'badge' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style = {},
  children,
}) => {
  const customStyles: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  return (
    <div
      className={`crefto-skeleton crefto-skeleton-${variant} ${className}`}
      style={customStyles}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

export default Skeleton;
