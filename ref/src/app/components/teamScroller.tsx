"use client";

import Image from "next/image";
import { useMemo, useEffect, useState, useRef } from "react";
import teamData from "../../data/team_members.json"

const CARD_WIDTH = 320 + 24;

const ScrollingRow = ({
  people,
  reverse = false,
}: {
  people: any[];
  reverse?: boolean;
}) => {
  const [repetitions, setRepetitions] = useState(10);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const totalWidthRef = useRef(0);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const cardsPerRow = Math.ceil((screenWidth * 2) / CARD_WIDTH);
    setRepetitions(cardsPerRow);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const repeated = useMemo(() => {
    return Array(repetitions).fill(people).flat();
  }, [people, repetitions]);

  useEffect(() => {
    if (scrollRef.current) {
      totalWidthRef.current = scrollRef.current.scrollWidth;
      
      // Set initial scroll position to middle of content for infinite effect
      scrollRef.current.scrollLeft = totalWidthRef.current / 4;
    }
  }, [repeated]);

  const handleInfiniteScroll = () => {
    if (!scrollRef.current || !totalWidthRef.current) return;
    
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const quarterWidth = totalWidthRef.current / 4;
    
    if (scrollLeft < quarterWidth) {
      scrollRef.current.scrollLeft += quarterWidth;
    } else if (scrollLeft > quarterWidth * 3) {
      scrollRef.current.scrollLeft -= quarterWidth;
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsInteracting(true);
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
    lastTimeRef.current = Date.now();
    lastXRef.current = clientX;
    velocityRef.current = 0;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - (scrollRef.current.offsetLeft ?? 0);
    const walk = (x - startX) * 1.5; // Increased movement multiplier for better touch response
    
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTimeRef.current;
    if (timeElapsed > 0) {
      velocityRef.current = (clientX - lastXRef.current) / timeElapsed * 0.5; // Increased velocity for better touch response
    }
    
    lastTimeRef.current = currentTime;
    lastXRef.current = clientX;
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
    handleInfiniteScroll();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!scrollRef.current) return;

    const startVelocity = velocityRef.current * 30; // Reduced velocity multiplier
    let currentVelocity = startVelocity;
    let lastTimestamp = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTimestamp;
      lastTimestamp = now;

      if (Math.abs(currentVelocity) > 0.01 && scrollRef.current) {
        scrollRef.current.scrollLeft -= currentVelocity * deltaTime;
        currentVelocity *= 0.97; // Slower deceleration for smoother stop
        handleInfiniteScroll();
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsInteracting(false);
      }
    };

    if (Math.abs(startVelocity) > 0.01) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsInteracting(false);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (!currentRef) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        currentRef.scrollLeft += e.deltaX * 0.5; // Reduced wheel scroll speed
        setIsInteracting(true);
        handleInfiniteScroll();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    };

    currentRef.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={scrollRef}
        className={`flex gap-6 w-max animate-marquee ${reverse ? "animate-marquee-reverse" : ""}`}
        // onMouseDown={handleDragStart}
        // onMouseMove={(e) => isDragging && handleDragMove(e)}
        // onMouseUp={handleDragEnd}
        // onMouseLeave={handleDragEnd}
        // onTouchStart={handleDragStart}
        // onTouchMove={handleDragMove}
        // onTouchEnd={handleDragEnd}
        // onTouchCancel={handleDragEnd}
      >
        {repeated.map((person, i) => (
          <div
            key={i}
            className="min-w-[320px] max-w-[320px] bg-white/10 backdrop-blur-md text-white p-3 rounded-2xl shadow-lg border border-white/10 flex items-center gap-4"
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="w-[100px] h-[100px] relative rounded-xl overflow-hidden shrink-0">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className={`font-semibold text-base ${person.color}`}>
                {person.name}
              </h3>
              <p className="text-sm text-gray-300 mt-1 leading-snug">
                {person.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamScroller = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-black">
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 h-full w-10 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-10 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div className="space-y-6">
        {teamData.map((row, idx) => (
          <ScrollingRow key={idx} people={row} reverse={idx % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default TeamScroller;
