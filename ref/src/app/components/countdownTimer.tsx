'use client';

import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isVisible, setIsVisible] = useState(true);

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

  if (!isVisible) {
    return null;
  }

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 md:p-3 shadow-lg border border-gray-700 min-w-[60px] md:min-w-[70px] hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
      <div className="text-lg md:text-2xl font-bold text-white mb-1 font-mono animate-pulse">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-gray-300 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-black py-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-2 right-1/3 w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Timer Display */}
        <div className="flex justify-center items-center space-x-2 md:space-x-4 animate-fade-in">
          <TimeUnit value={timeLeft.days} label="Days" />
          
          {/* Separator with animation */}
          <div className="text-white text-xl md:text-2xl font-bold animate-pulse">:</div>
          
          <TimeUnit value={timeLeft.hours} label="Hours" />
          
          {/* Separator with animation */}
          <div className="text-white text-xl md:text-2xl font-bold animate-pulse">:</div>
          
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          
          {/* Separator with animation */}
          <div className="text-white text-xl md:text-2xl font-bold animate-pulse">:</div>
          
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
        
        {/* Time remaining text */}
        <div className="text-center mt-3">
          <p className="text-sm text-gray-400 animate-fade-in-up">
            Time Remaining
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
