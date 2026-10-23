import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { Admin } from './pages/Admin/Admin';
import { Loading } from './components/Loading/Loading';
import { ContentProvider, useContent } from './context/ContentContext';

// Minimum time to show the loading screen so the particle animation isn't jarring
const MIN_LOADING_MS = 2000;

const AppInner: React.FC = () => {
  const { loading: contentLoading } = useContent();
  const [isLoading, setIsLoading] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#/admin') ||
      window.location.hash.startsWith('#admin')
    );
  });

  // Enforce a minimum display time so the animation isn't cut short
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), MIN_LOADING_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkRoute = () => {
      const adminActive =
        window.location.pathname.startsWith('/admin') ||
        window.location.hash.startsWith('#/admin') ||
        window.location.hash.startsWith('#admin');
      setIsAdmin(adminActive);
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Start fade-out once min time has passed AND content is ready.
  // Loading calls onFinish after the 600ms fade, which sets isLoading false.
  const shouldDismiss = minTimePassed && !contentLoading;

  return isAdmin ? (
    <Admin />
  ) : (
    <>
      {isLoading && (
        <Loading onFinish={() => setIsLoading(false)} dismiss={shouldDismiss} />
      )}
      {/* Only mount Home after loading is done so GSAP animations
          always start fresh with isLoaded=true */}
      {!isLoading && <Home isLoaded={true} />}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ContentProvider>
      <AppInner />
    </ContentProvider>
  );
};

export default App;
