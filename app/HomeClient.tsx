'use client';

import Hero from './components/Hero';
import VerticalScrollSections from './components/VerticalScrollSections';
import ExpandBussiness from './components/ExpandBussiness';
import ImageCarousel from './components/ImageCarousel';
import SmarterDataSection from './components/SmarterDataSection';
import JoinFutureCTA from './components/JoinFutureCTA';

export default function HomeClient() {
  return (
    <main className="home-page">
      <Hero />
      <VerticalScrollSections />
      <ExpandBussiness />
      <ImageCarousel />
      <SmarterDataSection />
      <JoinFutureCTA />
    </main>
  );
}

