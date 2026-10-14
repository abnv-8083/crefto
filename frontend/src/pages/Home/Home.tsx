import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Hero } from '../../sections/Hero/Hero';
import { MarqueeTicker } from '../../components/MarqueeTicker/MarqueeTicker';
import { About } from '../../sections/About/About';
import { Services } from '../../sections/Services/Services';
import { Process } from '../../sections/Process/Process';
import { Projects } from '../../sections/Projects/Projects';
import { Advantages } from '../../sections/Advantages/Advantages';
import { Contact } from '../../sections/Contact/Contact';
import { Footer } from '../../components/Footer/Footer';
import { ContentSkeletonLoader } from '../../components/Skeleton';
import { useContent } from '../../context/ContentContext';

interface HomeProps {
  isLoaded?: boolean;
}

export const Home: React.FC<HomeProps> = ({ isLoaded = true }) => {
  const { loading } = useContent();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'process', 'projects', 'advantages', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="crefto-app-wrapper">
      <Navbar activeSection={activeSection} />

      {loading ? (
        <main className="main-content">
          <ContentSkeletonLoader />
        </main>
      ) : (
        <main className="main-content">
          <Hero isLoaded={isLoaded} />
          <MarqueeTicker />
          <About />
          <Services />
          <Process />
          <Projects />
          <Advantages />
          <Contact />
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Home;
