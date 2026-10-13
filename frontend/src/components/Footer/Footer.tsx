import React from 'react';
import { Linkedin, Instagram, Twitter, ArrowUp, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../Button/Button';
import { useContent } from '../../context/ContentContext';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const footerData = content.footer;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      {/* Pre-footer Call-To-Action Banner */}
      <div className="footer-cta-banner">
        <div className="footer-cta-container">
          <div className="footer-cta-text-box">
            <span className="footer-cta-pill">START THE CONVERSATION</span>
            <h2 className="footer-cta-title">Ready to Transform Your Digital Presence?</h2>
            <p className="footer-cta-desc">
              Partner with Crefto to launch an award-winning web platform tailored to drive scalable business growth.
            </p>
          </div>
          <div className="footer-cta-btn-box">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch Today
            </Button>
          </div>
        </div>
      </div>

      <div className="footer-container">
        {/* Main Footer Row */}
        <div className="footer-top-row">
          {/* Logo & ChargeEase branding */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="footer-logo-link" title="Crefto Home">
                <img src="/logo/logo-dark.png" alt="Crefto Logo" className="footer-brand-logo-img" />
              </a>
            </div>
            <span className="footer-subtag">{footerData?.subtagline || 'A ChargeEase Company'}</span>
            <p className="footer-brand-tagline">
              {footerData?.tagline || 'Bespoke Web Development & High-Performance Cloud Architecture.'}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="footer-nav">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')}>Home</a>
            <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>About</a>
            <a href="#services" onClick={(e) => handleScrollTo(e, '#services')}>Services</a>
            <a href="#process" onClick={(e) => handleScrollTo(e, '#process')}>Process</a>
            <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')}>Work</a>
            <a href="#advantages" onClick={(e) => handleScrollTo(e, '#advantages')}>Advantages</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contact</a>
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="footer-socials-col">
            <div className="footer-socials">
              <a href={footerData?.socials?.linkedin || 'https://linkedin.com'} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon-btn">
                <Linkedin size={18} />
              </a>
              <a href={footerData?.socials?.instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon-btn">
                <Instagram size={18} />
              </a>
              <a href={footerData?.socials?.twitter || 'https://x.com'} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="social-icon-btn">
                <Twitter size={18} />
              </a>
            </div>

            <button
              onClick={handleBackToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Large Typographic Brand Watermark */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <span className="footer-watermark-text">CREFTO</span>
        </div>

        {/* Bottom divider & copyright */}
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p>{footerData?.copyright || `© ${new Date().getFullYear()} CREFTO. All rights reserved. Built under the ChargeEase ecosystem.`}</p>
          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span className="dot-sep">•</span>
            <span>Terms of Service</span>
            <span className="dot-sep">•</span>
            <a href="#/admin" className="admin-portal-badge-link" title="Open Admin CMS">
              <Shield size={12} className="text-[#FF3838]" />
              <span>Admin Portal</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
