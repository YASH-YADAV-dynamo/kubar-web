'use client';

import { useEffect, useState } from 'react';
import LandingHero from '../components/LandingHero';
import { useRouter } from 'next/navigation';

const SPLASH_COMPLETED_KEY = 'splash-completed';

export default function SplashPage() {
  const router = useRouter();
  const [canNavigate, setCanNavigate] = useState(false);

  useEffect(() => {
    // Prevent scrolling when splash screen is visible
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Prevent scroll events
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, page up/down, home, end, arrow keys
      if (keys.includes(e.keyCode)) {
        e.preventDefault();
        return false;
      }
    };
    
    // Prevent browser back button
    const preventBack = (e: PopStateEvent) => {
      if (!canNavigate) {
        // Push state again to prevent navigation
        window.history.pushState(null, '', '/splash');
        e.preventDefault();
      }
    };
    
    // Push state to prevent back button initially
    window.history.pushState(null, '', '/splash');
    
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
    window.addEventListener('popstate', preventBack);
    
    // Monitor pathname changes
    let lastPathname = window.location.pathname;
    const checkPathname = () => {
      if (!canNavigate && window.location.pathname !== '/splash' && window.location.pathname !== lastPathname) {
        lastPathname = '/splash';
        window.history.pushState(null, '', '/splash');
        router.replace('/splash');
      }
    };
    
    // Use MutationObserver to detect route changes (Next.js updates the DOM)
    const observer = new MutationObserver(checkPathname);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also check periodically as fallback
    const interval = setInterval(checkPathname, 200);
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
      window.removeEventListener('popstate', preventBack);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [canNavigate, router]);

  const handleLearnMore = () => {
    // Mark splash as completed
    if (typeof window !== 'undefined') {
      localStorage.setItem(SPLASH_COMPLETED_KEY, 'true');
    }
    setCanNavigate(true);
    // Restore scroll before navigation
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    // Navigate to home route
    router.push('/');
  };

  return (
    <div className="splash-page">
      <LandingHero onLearnMoreClick={handleLearnMore} />
      <style jsx>{`
        .splash-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10001;
          background: var(--color-background);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

