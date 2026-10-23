import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { Admin } from './pages/Admin/Admin';
import { Loading } from './components/Loading/Loading';
import { ContentProvider, useContent } from './context/ContentContext';

// Minimum time to show the loading screen so the particle animation isn't jarring
const MIN_LOADING_MS = 2000;

const AppInner: React.FC = () => {
  const { loading: contentLoading } = useContent();
  // loadingOverlayDone: the overlay fade has completed, overlay is removed
  const [loadingOverlayDone, setLoadingOverlayDone] = useState(false);
  // homeReady: Home has been mounted and GSAP can start (one rAF after overlay gone)
  const [homeReady, setHomeReady] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#/admin') ||
      window.location.hash.startsWith('#admin')
    );
  });

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

  // Once the overlay is fully gone, wait one animation frame so the browser
  // has painted Home before GSAP fires — prevents the headline from being invisible
  useEffect(() => {
    if (!loadingOverlayDone) return;
    const raf = requestAnimationFrame(() => setHomeReady(true));
    return () => cancelAnimationFrame(raf);
  }, [loadingOverlayDone]);

  const shouldDismiss = minTimePassed && !contentLoading;

  return isAdmin ? (
    <Admin />
  ) : (
    <>
      {/* Loading overlay: stays until its 600ms CSS fade completes */}
      {!loadingOverlayDone && (
        <Loading onFinish={() => setLoadingOverlayDone(true)} dismiss={shouldDismiss} />
      )}
      {/* Home mounts as soon as the overlay is gone (no black screen gap),
          but isLoaded=true is delayed one rAF so GSAP queries painted elements */}
      {loadingOverlayDone && <Home isLoaded={homeReady} />}
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
