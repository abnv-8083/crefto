import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Hero } from '../../sections/Hero/Hero';
import { MarqueeTicker } from '../../components/MarqueeTicker/MarqueeTicker';
import { Footer } from '../../components/Footer/Footer';
import { useInView } from '../../hooks/useInView';

// Lazy-load every below-fold section so they don't block the initial bundle
const About      = lazy(() => import('../../sections/About/About'));
const Services   = lazy(() => import('../../sections/Services/Services'));
const Process    = lazy(() => import('../../sections/Process/Process'));
const Projects   = lazy(() => import('../../sections/Projects/Projects'));
const Advantages = lazy(() => import('../../sections/Advantages/Advantages'));
const Contact    = lazy(() => import('../../sections/Contact/Contact'));

// Lightweight placeholder while a lazy section loads
const SectionPlaceholder: React.FC<{ minHeight?: number }> = ({ minHeight = 400 }) => (
  <div style={{ minHeight, width: '100%' }} aria-hidden="true" />
);

interface HomeProps {
  isLoaded?: boolean;
}

export const Home: React.FC<HomeProps> = ({ isLoaded = true }) => {
  const [activeSection, setActiveSection] = useState('home');

  // IntersectionObserver refs — each section mounts only when near viewport
  const [aboutRef,      aboutInView]      = useInView('300px 0px');
  const [servicesRef,   servicesInView]   = useInView('300px 0px');
  const [processRef,    processInView]    = useInView('300px 0px');
  const [projectsRef,   projectsInView]   = useInView('300px 0px');
  const [advantagesRef, advantagesInView] = useInView('300px 0px');
  const [contactRef,    contactInView]    = useInView('300px 0px');

  // Throttled scroll handler — only runs one rAF per scroll burst
  useEffect(() => {
    let rafPending = false;

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;

      requestAnimationFrame(() => {
        rafPending = false;
        const sections = ['home', 'about', 'services', 'process', 'projects', 'advantages', 'contact'];
        const scrollY = window.scrollY + 200;

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="crefto-app-wrapper">
      <Navbar activeSection={activeSection} />

      <main className="main-content">
        {/* ── Hero — always eager, above the fold ── */}
        <Hero isLoaded={isLoaded} />

        <MarqueeTicker />

        {/* ── About ── */}
        <div ref={aboutRef}>
          {aboutInView ? (
            <Suspense fallback={<SectionPlaceholder minHeight={600} />}>
              <About />
            </Suspense>
          ) : (
            <SectionPlaceholder minHeight={600} />
          )}
        </div>

        {/* ── Services ── */}
        <div ref={servicesRef}>
          {servicesInView ? (
            <Suspense fallback={<SectionPlaceholder minHeight={700} />}>
              <Services />
            </Suspense>
          ) : (
            <SectionPlaceholder minHeight={700} />
          )}
        </div>

        {/* ── Process ── */}
        <div ref={processRef}>
          {processInView ? (
            <Suspense fallback={<SectionPlaceholder minHeight={800} />}>
              <Process />
            </Suspense>
          ) : (
            <SectionPlaceholder minHeight={800} />
          )}
        </div>

        {/* ── Projects ── */}
        <div ref={projectsRef}>
          {projectsInView ? (
            <Suspense fallback={<SectionPlaceholder minHeight={700} />}>
              <Projects />
            </Suspense>
          ) : (
            <SectionPlaceholder minHeight={700} />
          )}
        </div>

        {/* ── Advantages ── */}
        <div ref={advantagesRef}>
          {advantagesInView ? (
            <Suspense fallback={<SectionPlaceholder minHeight={500} />}>
              <Advantages />
            </Suspense>
          ) : (
            <SectionPlaceholder minHeight={500} />
          )}
        </div>

        {/* ── Contact ── */}
        <div ref={contactRef}>
          {contactInView ? (
            <Suspense fallback={<SectionPlaceholder minHeight={500} />}>
              <Contact />
            </Suspense>
          ) : (
            <SectionPlaceholder minHeight={500} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
