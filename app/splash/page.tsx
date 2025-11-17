'use client';

import { useEffect, useState } from 'react';
import LandingHero from '../components/LandingHero';
import { useRouter } from 'next/navigation';

const SPLASH_COMPLETED_KEY = 'splash-completed';

export default function SplashPage() {
  const router = useRouter();
  const [canNavigate, setCanNavigate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if splash already completed on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const splashCompleted = localStorage.getItem(SPLASH_COMPLETED_KEY);
      if (splashCompleted) {
        // If already completed, redirect to home
        router.replace('/home');
        return;
      }
    }
  }, [router]);

  // Initial loader for 0.5 seconds (hardcoded)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Prevent scrolling when splash screen is visible (desktop only)
    if (!isMobile) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // On mobile, just prevent body overflow, allow scrolling within splash page
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
    
    // Prevent scroll events (desktop only)
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    // On mobile, allow touch scrolling - don't prevent it
    const preventTouchScroll = (e: TouchEvent) => {
      // Allow all touch scrolling on mobile
      // This handler is mainly for cleanup consistency
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
    
    // Only add desktop scroll prevention
    if (!isMobile) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    }
    // On mobile, don't add touchmove listener - allow natural scrolling
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
      document.body.style.height = '';
      if (!isMobile) {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('keydown', preventScrollKeys);
      }
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
    router.push('/home');
  };

  return (
    <div className="splash-page">
      {isLoading ? (
        <div className="initial-loader">
          <div className="loader-content">
            <div className="loader-spinner"></div>
          </div>
        </div>
      ) : (
        <LandingHero onLearnMoreClick={handleLearnMore} />
      )}
      <style jsx>{`
        .splash-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 10001;
          background: var(--color-background);
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 769px) {
          .splash-page {
            overflow: hidden;
          }
        }

        .initial-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background);
          z-index: 10002;
          animation: fadeOut 0.3s ease-out 0.2s forwards;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .loader-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: #F7941D;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}

