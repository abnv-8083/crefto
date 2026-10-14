import React from 'react';
import { Skeleton } from './Skeleton';
import './Skeleton.css';

export const ContentSkeletonLoader: React.FC = () => {
  return (
    <div className="content-skeleton-overlay" aria-label="Loading site content...">
      {/* 1. Hero Section Skeleton */}
      <div className="content-skeleton-hero">
        {/* Status Pill */}
        <Skeleton variant="pill" width={320} height={36} />

        {/* Big Headline */}
        <Skeleton variant="title" width="80%" height={64} style={{ maxWidth: 800 }} />
        <Skeleton variant="title" width="60%" height={64} style={{ maxWidth: 600 }} />

        {/* Description Paragraph */}
        <div style={{ width: '100%', maxWidth: 680, marginTop: 12 }}>
          <Skeleton variant="text" height={16} />
          <Skeleton variant="text" height={16} width="90%" />
          <Skeleton variant="text" height={16} width="75%" />
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
          <Skeleton variant="pill" width={180} height={48} />
          <Skeleton variant="pill" width={160} height={48} />
        </div>

        {/* Telemetry Grid */}
        <div className="content-skeleton-telemetry-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="crefto-skeleton-card" style={{ padding: '20px 24px' }}>
              <Skeleton variant="title" width="50%" height={32} />
              <Skeleton variant="text" width="70%" height={12} />
              <Skeleton variant="text" width="90%" height={10} />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Services Section Skeleton */}
      <div className="content-skeleton-section">
        <Skeleton variant="badge" width={140} height={20} />
        <Skeleton variant="title" width={420} height={40} />
        <Skeleton variant="text" width={580} height={16} />

        <div className="content-skeleton-cards-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="crefto-skeleton-card" style={{ minHeight: 280 }}>
              <Skeleton variant="circular" width={48} height={48} style={{ marginBottom: 16 }} />
              <Skeleton variant="title" width="80%" height={24} />
              <Skeleton variant="text" height={14} />
              <Skeleton variant="text" height={14} width="90%" />
              <Skeleton variant="rectangular" height={120} style={{ marginTop: 16, borderRadius: 12 }} />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Projects Showcase Skeleton */}
      <div className="content-skeleton-section">
        <Skeleton variant="badge" width={160} height={20} />
        <Skeleton variant="title" width={460} height={40} />
        <div style={{ display: 'flex', gap: 12 }}>
          {['All', 'Business Website', 'Web Application', 'E-Commerce'].map((cat) => (
            <Skeleton key={cat} variant="pill" width={120} height={34} />
          ))}
        </div>

        <div className="crefto-skeleton-card" style={{ height: 400, marginTop: 16 }}>
          <Skeleton variant="rectangular" height="100%" style={{ borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
};

export default ContentSkeletonLoader;
