'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const GlassModal: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Target date: November 18, 2025, 00:00:00 GMT+5:30 (IST)
    const targetDate = new Date('2025-11-18T00:00:00+05:30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isScrolled) {
    return null;
  }

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-white/30 min-w-[90px] md:min-w-[120px] hover:scale-105 transition-all duration-300 hover:shadow-blue-500/20">
      <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 font-mono animate-pulse">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-white/80 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      {/* Glass Modal */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-5xl w-full mx-4">
        
        {/* Navdhan Logo and Context */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Image 
              src="/navdhan_logo.png" 
              alt="Navdhan Logo" 
              width={120} 
              height={120}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">
            Navdhan Launching In
          </h2>
          
        </div>

        {/* Timer Display */}
        <div className="flex justify-center items-center space-x-3 md:space-x-6 mb-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          
          {/* Separator */}
          <div className="text-white text-3xl md:text-4xl font-bold">:</div>
          
          <TimeUnit value={timeLeft.hours} label="Hours" />
          
          {/* Separator */}
          <div className="text-white text-3xl md:text-4xl font-bold">:</div>
          
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          
          {/* Separator */}
          <div className="text-white text-3xl md:text-4xl font-bold">:</div>
          
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Countdown message */}
        <div className="text-center">
          <p className="text-lg md:text-xl text-white/80 font-medium">
            {timeLeft.days} days to go live!
          </p>
          <p className="text-sm text-white/60 mt-2">
            On 18th November, 2025 at{' '}
            <a 
              href="https://www.bengalurutechsummit.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
            >
              Bengaluru Tech Summit
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlassModal;
