import React from 'react';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Top section */}
        <div className="footer-top-row">
          {/* Logo & ChargeEase branding */}
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="logo-symbol-wrapper">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 15C13.5 15 9 19.5 9 25C9 30.5 13.5 35 19 35C23.2 35 26.8 32.3 28.2 28.5H22.5C21.7 30 20.4 30.8 19 30.8C15.8 30.8 13.2 28.2 13.2 25C13.2 21.8 15.8 19.2 19 19.2C20.5 19.2 21.8 20.1 22.6 21.5H28.3C26.9 17.7 23.3 15 19 15Z"
                    fill="#FF3838"
                  />
                  <path
                    d="M25 21.5V35H29.2V27.2C30.4 25.5 32.3 24.5 34.5 24.5H38V20.2H34.5C31.2 20.2 28.5 21.8 27.2 24.2V21.5H25Z"
                    fill="#FF3838"
                  />
                  <circle cx="37" cy="18" r="3" fill="#FF3838" />
                </svg>
              </div>
              <span className="footer-brand-title">Crefto</span>
            </div>
            <span className="footer-subtag">A ChargeEase Company</span>
          </div>

          {/* Navigation Links */}
          <nav className="footer-nav">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')}>Home</a>
            <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>About</a>
            <a href="#services" onClick={(e) => handleScrollTo(e, '#services')}>Services</a>
            <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')}>Projects</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contact</a>
          </nav>

          {/* Social Icons */}
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon-btn">
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon-btn">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon-btn">
              <Facebook size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="social-icon-btn">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>© 2025 Crefto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
