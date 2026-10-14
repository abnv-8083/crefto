import React, { useState } from 'react';
import { Skeleton } from './Skeleton';
import './Skeleton.css';

export interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  wrapperStyle = {},
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`skeleton-image-wrapper ${wrapperClassName}`} style={wrapperStyle}>
      {!isLoaded && !hasError && (
        <Skeleton variant="rectangular" className="skeleton-image-placeholder" />
      )}
      <img
        src={src}
        alt={alt}
        className={`skeleton-image-element ${isLoaded ? 'loaded' : ''} ${className}`}
        style={style}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
};

export default SkeletonImage;
