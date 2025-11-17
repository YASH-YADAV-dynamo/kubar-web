'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  { id: 1, src: '/card1.svg', alt: 'Card 1' },
  { id: 2, src: '/card2.svg', alt: 'Card 2' },
  { id: 3, src: '/card3.svg', alt: 'Card 3' },
  { id: 4, src: '/card4.svg', alt: 'Card 4' },
  { id: 5, src: '/card5.svg', alt: 'Card 5' },
];

export default function ExpandBussiness() {
  const [isMobile, setIsMobile] = useState(false);
  const [cardOrder, setCardOrder] = useState([...cards]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const rotateCards = () => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const first = newOrder.shift();
      if (first) {
        newOrder.push(first);
      }
      return newOrder;
    });
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const last = newOrder.pop();
      if (last) {
        newOrder.unshift(last);
      }
      return newOrder;
    });
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    rotateCards();
  };

  useEffect(() => {
    if (!isMobile || cardOrder.length < 4 || !isAutoPlaying) return;

    // Start animation after initial delay, then repeat every 3 seconds
    const initialTimeout = setTimeout(() => {
      rotateCards();
      const interval = setInterval(rotateCards, 3000);
      animationTimeoutRef.current = interval as any;
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      if (animationTimeoutRef.current) {
        clearInterval(animationTimeoutRef.current as any);
      }
    };
  }, [isMobile, isAutoPlaying, cardOrder.length]);

  return (
    <section className="expand-business-section">
      {/* Main Heading */}
      <h1 className="expand-heading" style={{ color: '#ffd700' }}>
        Expand Your Business with Kubar
      </h1>

      {/* Gradient Overlay Container */}
      <div className="expand-container">
        {/* Left Gradient */}
        <div className="expand-gradient expand-gradient-left" />

        {/* Right Gradient */}
        <div className="expand-gradient expand-gradient-right" />

        {/* Image Container */}
        <div className="expand-images-wrapper">
          {isMobile ? (
            <div className="expand-slider-wrap">
              {/* Navigation Arrows */}
              <div className="expand-nav-arrows">
                <button 
                  className="expand-nav-arrow expand-nav-arrow-up"
                  onClick={goToPrevious}
                  aria-label="Previous card"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <button 
                  className="expand-nav-arrow expand-nav-arrow-down"
                  onClick={goToNext}
                  aria-label="Next card"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <div className="expand-slider">
                {cardOrder.slice(0, 4).map((card, index) => {
                  // Position mapping: cards cascade from front to back
                  // Index 0: top card (fading out) - moves up
                  // Index 1: center card - moves to front
                  // Index 2: front card (fully visible) - stays at front position
                  // Index 3: back card - moves to center
                  
                  const positions = [
                    { x: 0, y: 0, opacity: 0.75, zIndex: 0 }, // Center - will move up
                    { x: 79, y: 125, opacity: 1, zIndex: 1 }, // Front - will move to center
                    { x: 0, y: 250, opacity: 0.75, zIndex: 0 }, // Back - will move to front
                    { x: 0, y: 400, opacity: 0, zIndex: 0 }, // Hidden - will move to back
                  ];

                  const targetPositions = [
                    { x: 0, y: -120, opacity: 0, zIndex: 0 }, // Moves up and fades
                    { x: 0, y: 0, opacity: 0.75, zIndex: 0 }, // Moves to center
                    { x: 79, y: 125, opacity: 1, zIndex: 1 }, // Moves to front
                    { x: 0, y: 250, opacity: 0.75, zIndex: 0 }, // Moves to back
                  ];

                  const initialPos = positions[index] || positions[0];
                  const targetPos = targetPositions[index] || targetPositions[0];

                  return (
                    <motion.div
                      key={`${card.id}-${index}-${cardOrder[0]?.id}`}
                      className="expand-slider-item"
                      initial={{
                        x: initialPos.x,
                        y: initialPos.y,
                        opacity: initialPos.opacity,
                        zIndex: initialPos.zIndex,
                      }}
                      animate={{
                        x: targetPos.x,
                        y: targetPos.y,
                        opacity: targetPos.opacity,
                        zIndex: targetPos.zIndex,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      style={{
                        position: 'absolute',
                      }}
                    >
                      <div className="expand-slider-card">
                        <Image
                          src={card.src}
                          alt={card.alt}
                          width={256}
                          height={320}
                          className="expand-slider-image"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="expand-images">
              {cards.map((card) => (
                <div key={card.id} className="expand-image-item">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={256}
                    height={320}
                    className="expand-image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .expand-business-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          margin-bottom: calc(var(--spacing-3xl) * 2);
          background: var(--color-background);
          position: relative;
          overflow-x: visible;
          overflow-y: visible;
        }

        .expand-heading {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          color: #ffd700 !important;
          font-family: var(--font-heading);
          padding: 0 var(--content-padding);
        }

        .expand-container {
          position: relative;
          width: 100%;
          overflow-x: visible;
          overflow-y: visible;
        }

        @media (min-width: 768px) {
          .expand-container {
            overflow: hidden;
          }
        }

        .expand-gradient {
          position: absolute;
          top: 0;
          width: 401.9px;
          height: 479.6px;
          z-index: 10;
          pointer-events: none;
          display: none;
        }

        @media (min-width: 768px) {
          .expand-gradient {
            display: block;
          }
        }

        .expand-gradient-left {
          left: 0;
          background: linear-gradient(to right, var(--color-background), transparent);
        }

        .expand-gradient-right {
          right: 0;
          background: linear-gradient(to left, var(--color-background), transparent);
        }

        .expand-images-wrapper {
          width: 100%;
          padding: 0;
          overflow-x: visible;
          overflow-y: visible;
        }

        @media (min-width: 768px) {
          .expand-images-wrapper {
            padding: 0 var(--content-padding);
          }
        }

        .expand-images {
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
          overflow-y: visible;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          padding: 0.5rem var(--content-padding);
          width: 100%;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }

        .expand-images::-webkit-scrollbar {
          display: none;
        }

        .expand-image-item {
          flex-shrink: 0;
          height: 256px;
          width: auto;
          aspect-ratio: 256 / 320;
          overflow: visible;
        }

        .expand-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        @media (min-width: 768px) {
          .expand-images {
            justify-content: center;
            gap: 1.5rem;
          }

          .expand-image-item {
            height: 288px;
            flex: 0 0 auto;
          }
        }

        @media (min-width: 1024px) {
          .expand-images {
            gap: 2rem;
          }

          .expand-image-item {
            height: 320px;
          }
        }

        @media (max-width: 767px) {
          .expand-business-section {
            overflow-x: visible;
            overflow-y: visible;
            padding: var(--spacing-3xl) 0;
            min-height: 400px;
          }

          .expand-heading {
            margin-bottom: var(--spacing-2xl);
            padding: 0 var(--content-padding);
            font-size: 1.5rem;
          }

          .expand-container {
            overflow-x: visible;
            overflow-y: visible;
          }

          .expand-images-wrapper {
            padding: 0;
            overflow-x: visible;
            overflow-y: visible;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 350px;
          }

          .expand-slider-wrap {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            padding-right: calc(var(--content-padding) + 40px);
            margin-right: 20px;
          }

          .expand-nav-arrows {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
            justify-content: center;
            z-index: 10;
            flex-shrink: 0;
          }

          .expand-nav-arrow {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.15);
            border: 2px solid rgba(255, 215, 0, 0.4);
            color: #ffd700;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 0;
          }

          .expand-nav-arrow:hover {
            background: rgba(255, 215, 0, 0.25);
            border-color: rgba(255, 215, 0, 0.6);
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
          }

          .expand-nav-arrow:active {
            transform: scale(0.95);
          }

          .expand-nav-arrow svg {
            width: 20px;
            height: 20px;
          }

          .expand-slider {
            position: relative;
            width: 100%;
            max-width: 280px;
            height: 400px;
            margin: 0 auto;
            margin-right: 30px;
            padding: 0 20px 0 0;
          }

          .expand-slider-item {
            width: 200px;
            padding: 10px;
            border-radius: 10px;
            background-color: #ffffff;
            box-shadow: 0 4px 9px rgba(241, 241, 244, 0.72);
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            will-change: transform, opacity;
          }

          .expand-slider-card {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .expand-slider-image {
            width: 100%;
            height: auto;
            max-width: 180px;
            max-height: 220px;
            object-fit: contain;
            border-radius: 8px;
          }

          .expand-images {
            gap: 0.75rem;
            padding: var(--spacing-lg) var(--content-padding);
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: visible;
            -webkit-overflow-scrolling: touch;
            width: 100%;
            min-height: 180px;
          }

          .expand-image-item {
            min-width: 120px;
            width: 120px;
            height: 150px;
            flex-shrink: 0;
            overflow: visible;
            position: relative;
          }

          .expand-image {
            width: 100%;
            height: 100%;
            max-width: 120px;
            max-height: 150px;
            object-fit: contain;
          }
        }

        @media (max-width: 480px) {
          .expand-business-section {
            padding: var(--spacing-2xl) 0;
            margin-bottom: calc(var(--spacing-2xl) * 1.5);
            min-height: 350px;
          }

          .expand-heading {
            margin-bottom: var(--spacing-xl);
            font-size: 1.35rem;
          }

          .expand-images-wrapper {
            min-height: 300px;
          }

          .expand-nav-arrow {
            width: 40px;
            height: 40px;
          }

          .expand-nav-arrow svg {
            width: 18px;
            height: 18px;
          }

          .expand-slider {
            max-width: 240px;
            height: 350px;
          }

          .expand-slider-item {
            width: 180px;
          }

          .expand-slider-image {
            max-width: 160px;
            max-height: 200px;
          }

          .expand-images {
            gap: 0.6rem;
            padding: var(--spacing-md) var(--content-padding);
            min-height: 160px;
          }

          .expand-image-item {
            min-width: 100px;
            width: 100px;
            height: 125px;
            overflow: visible;
          }

          .expand-image {
            max-width: 100px;
            max-height: 125px;
          }
        }
      `}</style>
    </section>
  );
}

