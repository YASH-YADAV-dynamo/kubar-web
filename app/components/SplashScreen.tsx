'use client';

import { useState, useEffect } from 'react';
import LandingHero from './LandingHero';

export default function SplashScreen({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling when splash screen is visible
    if (isVisible) {
      // Save current scroll position
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
      
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventScrollKeys);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  }, [isVisible]);

  const handleLearnMore = () => {
    setIsVisible(false);
    // Restore scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`splash-screen ${!isVisible ? 'splash-screen-hidden' : ''}`}>
      <LandingHero onLearnMoreClick={handleLearnMore} />
      <style jsx>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10001;
          background: var(--color-background);
          animation: fadeIn 0.3s ease-in;
          overflow: hidden;
        }

        .splash-screen-hidden {
          animation: fadeOut 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}

