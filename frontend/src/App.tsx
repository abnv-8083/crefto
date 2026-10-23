import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { Admin } from './pages/Admin/Admin';
import { Loading } from './components/Loading/Loading';
import { ContentProvider } from './context/ContentContext';

const MIN_LOADING_MS = 2000;

const AppInner: React.FC = () => {
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [mountHome, setMountHome] = useState(false);
  // overlayVisible: controls whether the loading overlay is shown
  const [overlayVisible, setOverlayVisible] = useState(true);
  // homeAnimating: passed as isLoaded to Home — only true after overlay is fully gone
  const [homeAnimating, setHomeAnimating] = useState(false);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#/admin') ||
      window.location.hash.startsWith('#admin')
    );
  });

  useEffect(() => {
    // Mount Home slightly before the dismiss so it's ready when overlay fades
    const mountTimer = setTimeout(() => setMountHome(true), MIN_LOADING_MS - 400);
    const dismissTimer = setTimeout(() => setMinTimePassed(true), MIN_LOADING_MS);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(dismissTimer);
    };
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

  // Dismiss after min time — no API dependency, content is already available from cache/defaults
  const shouldDismiss = minTimePassed;

  const handleLoadingFinish = () => {
    // Step 1: hide the overlay div (keep it in DOM one more frame)
    setOverlayVisible(false);
    // Step 2: one rAF later, trigger Home's entrance animations
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHomeAnimating(true);
      });
    });
  };

  return isAdmin ? (
    <Admin />
  ) : (
    <>
      {/* ── Loading overlay ──────────────────────────────────────────────
          Always rendered until onFinish fires; CSS handles the fade-out.
          After finish we hide it with display:none so it can't block clicks. */}
      <div style={{ display: overlayVisible ? 'block' : 'none' }}>
        <Loading onFinish={handleLoadingFinish} dismiss={shouldDismiss} />
      </div>

      {/* ── Home page ────────────────────────────────────────────────────
          Mounted at 1.6s (400ms before dismiss) so it's ready when the
          overlay fades. Hidden via visibility so layout exists but nothing
          is visible until the overlay is gone. */}
      {mountHome && (
        <div style={{ visibility: overlayVisible ? 'hidden' : 'visible' }}>
          <Home isLoaded={homeAnimating} />
        </div>
      )}
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
