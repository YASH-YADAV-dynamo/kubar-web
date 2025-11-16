'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import VerticalScrollSections from './components/VerticalScrollSections';
import ExpandBussiness from './components/ExpandBussiness';
import ImageCarousel from './components/ImageCarousel';
import SmarterDataSection from './components/SmarterDataSection';
import JoinFutureCTA from './components/JoinFutureCTA';

export default function HomeClient() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Add/remove class to body to control header visibility
    if (showSplash) {
      document.body.classList.add('splash-active');
    } else {
      document.body.classList.remove('splash-active');
    }
    
    return () => {
      document.body.classList.remove('splash-active');
    };
  }, [showSplash]);

  const handleSplashClose = () => {
    setShowSplash(false);
    // Wait for splash screen to fade out, then scroll directly to hero section
    setTimeout(() => {
      // First ensure we're at the top
      window.scrollTo(0, 0);
      // Then immediately scroll to hero section
      requestAnimationFrame(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          const headerOffset = 80; // Account for any header height
          const elementPosition = heroSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback: scroll to top if hero section not found
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }, 350); // Wait slightly longer than the fade animation (300ms)
  };

  return (
    <>
      {showSplash && <SplashScreen onClose={handleSplashClose} />}
      <main className="home-page">
        <Hero />
        <VerticalScrollSections />
        <ExpandBussiness />
        <ImageCarousel />
        <SmarterDataSection />
        <JoinFutureCTA />
      </main>
    </>
  );
}

