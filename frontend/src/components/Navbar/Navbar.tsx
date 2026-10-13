import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import ScrollProgress from '../ScrollProgress/ScrollProgress';

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Advantages', href: '#advantages', id: 'advantages' },
    { name: 'Contact', href: '#contact', id: 'contact' },
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
    <>
      <ScrollProgress />
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo */}
          <a href="#home" className="navbar-logo" onClick={(e) => handleScrollTo(e, '#home')}>
            <img src="/logo/logo-dark.png" alt="Crefto Logo" className="navbar-logo-img" />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive = activeSection.toLowerCase() === link.id.toLowerCase();
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
    </>
  );
};

export default Navbar;
