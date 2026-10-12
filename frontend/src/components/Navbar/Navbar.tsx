import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="navbar-logo" onClick={(e) => handleScrollTo(e, '#home')}>
          <div className="logo-symbol-wrapper">
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="logo-text">Crefto</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection.toLowerCase() === link.name.toLowerCase();
              return (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                    {isActive && <span className="active-indicator" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA Button */}
        <div className="navbar-actions">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="navbar-cta-btn"
          >
            <span>Get Started</span>
            <ArrowRight size={15} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="mobile-nav-link"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mobile-cta-wrapper">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="mobile-cta-btn"
              >
                Get Started <ArrowRight size={16} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
