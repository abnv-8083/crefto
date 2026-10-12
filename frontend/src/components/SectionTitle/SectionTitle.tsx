import React from 'react';

interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  tag,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`section-header-block ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {tag && (
        <div className="section-tag-wrapper">
          <span className="section-tag-text">{tag}</span>
          <span className="section-tag-line"></span>
        </div>
      )}
      <h2 className="section-main-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};
