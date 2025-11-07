'use client';
import React from 'react';
import GlassModal from './components/glassModal';
import Hero from './components/hero';
import TextSlider from './components/slider';
import Advantage from './components/advantage';
import VerticalScrollSections from './components/verticalScrollSection';
import KubarNBFCs from './components/kubarForNBFC';
import KubarMSME from './components/kubarForMSME';
import ExpandBussiness from './components/expandBussiness';
import Contact from './components/contact';
import Waitlist from './components/waitlist';
import Footer from './components/footer';
import TeamScroller from './components/teamScroller';
import KubarCarousel from './components/expandBusinessCarousel';
import LearnWithKubar from './components/learnWithKubar';

const HomePage = () => {
  return (
    <main>
      {/* Glass Modal with Timer */}
      <GlassModal />

      {/* Hero from external component */}
      <div className="p-0">
        <Hero />
      </div>

      {/* Add spacing between Hero and TextSlider */}
      <div className="mt-0">
        <TextSlider />
      </div>

      {/* Advantage Section */}
      <div className="mt-0">
        <Advantage />
      </div>

      {/* Vertical Scroll Sections */}
      <div className="flex justify-center bg-black">
        <VerticalScrollSections />
      </div>

      {/* Expand Business Section */}
      {/* <div className="mt-0">
        <ExpandBussiness />
      </div> */}
      {/* Expand Business Section */}
      <div className="mt-0">
        <KubarCarousel />
      </div>
    
      {/* KubarNBFCs Section */}
      <div className="mt-0">
        <KubarNBFCs />
      </div>

      {/* KubarMSME Section */}
      <div className="mt-0">
        <KubarMSME />
      </div>

      {/* Learn With Kubar Section */}
      <div className="mt-0">
        <LearnWithKubar />
      </div>

      {/* Contact Section */}
      <div>
        <Contact />
      </div>
      
      {/* TeamView */}
      <div>
        <TeamScroller/>
      </div>

       {/* waitlist */}
      <div>
        <Waitlist />
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>

    </main>
  );
};

export default HomePage;
