'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageCarousel() {
  const images = Array.from({ length: 5 }, (_, i) => i + 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getImagePath = (id: number) => `/showcase/${id}.png`;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  return (
    <section className="showcase-section">
      <div className="container">
        <h2 className="showcase-heading">Product Showcase</h2>
        <div className="carousel-container">
          <button 
            className="carousel-button carousel-button-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="carousel-slide-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="carousel-slide"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="carousel-image-wrapper">
                  <Image
                    src={getImagePath(images[currentIndex])}
                    alt={`Showcase ${images[currentIndex]}`}
                    width={800}
                    height={600}
                    className="carousel-image"
                    priority={currentIndex === 0}
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className="carousel-button carousel-button-next"
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .showcase-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          background: var(--color-background);
          min-height: 80vh;
          display: flex;
          align-items: center;
          position: relative;
        }

        .showcase-heading {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-3xl);
          color: #ffd700;
          font-family: var(--font-heading);
        }

        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .carousel-slide-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 600px;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 8px 30px rgba(0, 0, 0, 0.4),
            0 0 0 2px rgba(255, 255, 255, 0.1);
        }

        .carousel-slide {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .carousel-button {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #ffd700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          flex-shrink: 0;
        }

        .carousel-button:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: #ffd700;
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
        }

        .carousel-button:active {
          transform: scale(0.95);
        }

        .carousel-button svg {
          width: 24px;
          height: 24px;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .carousel-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 215, 0, 0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .carousel-indicator:hover {
          background: rgba(255, 215, 0, 0.5);
          border-color: rgba(255, 215, 0, 0.7);
          transform: scale(1.2);
        }

        .carousel-indicator.active {
          background: #ffd700;
          border-color: #ffd700;
          width: 32px;
          border-radius: 6px;
        }

        @media (max-width: 968px) {
          .carousel-container {
            gap: 0.5rem;
          }

          .carousel-slide-container {
            height: 500px;
            max-width: 100%;
          }

          .carousel-button {
            width: 48px;
            height: 48px;
          }

          .carousel-button svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 768px) {
          .showcase-section {
            padding: var(--spacing-2xl) 0;
            min-height: auto;
          }

          .carousel-slide-container {
            height: 400px;
            border-radius: 16px;
          }

          .carousel-button {
            width: 40px;
            height: 40px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
          }

          .carousel-button-prev {
            left: 1rem;
          }

          .carousel-button-next {
            right: 1rem;
          }

          .carousel-indicators {
            margin-top: 1.5rem;
            gap: 0.5rem;
          }

          .carousel-indicator {
            width: 10px;
            height: 10px;
          }

          .carousel-indicator.active {
            width: 24px;
          }
        }

        @media (max-width: 480px) {
          .carousel-slide-container {
            height: 300px;
            border-radius: 12px;
          }

          .carousel-button {
            width: 36px;
            height: 36px;
          }

          .carousel-button svg {
            width: 18px;
            height: 18px;
          }

          .carousel-button-prev {
            left: 0.5rem;
          }

          .carousel-button-next {
            right: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}

