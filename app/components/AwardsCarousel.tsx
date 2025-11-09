'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AwardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const awards = [
    '/awards/img1.jpg',
    '/awards/img2.jpg',
    '/awards/img3.jpg',
    '/awards/img4.jpg',
    '/awards/img5.jpg',
  ];

  useEffect(() => {
    if (awards.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, awards.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };

  return (
    <section className="awards-carousel-section">
      <div className="container">
        <div
          className="awards-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="awards-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {awards.map((src, index) => (
              <div key={index} className="awards-carousel-slide">
                <div className="awards-image-wrapper">
                  <Image
                    src={src}
                    alt={`Award ${index + 1}`}
                    width={800}
                    height={600}
                    className="awards-image"
                    priority={index === 0}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="awards-carousel-nav awards-carousel-nav-prev"
            onClick={prevSlide}
            aria-label="Previous award"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="awards-carousel-nav awards-carousel-nav-next"
            onClick={nextSlide}
            aria-label="Next award"
          >
            <ChevronRight size={24} />
          </button>

          {/* Navigation Dots */}
          <div className="awards-carousel-dots">
            {awards.map((_, index) => (
              <button
                key={index}
                className={`awards-carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to award ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .awards-carousel-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          background: var(--color-background);
          position: relative;
        }

        .awards-carousel-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--content-padding);
          overflow: hidden;
        }

        .awards-carousel-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .awards-carousel-slide {
          min-width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 var(--spacing-md);
        }

        .awards-image-wrapper {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 4 / 3;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          background: var(--color-surface);
        }

        .awards-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .awards-carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .awards-carousel-nav:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translateY(-50%) scale(1.1);
          border-color: var(--color-primary);
        }

        .awards-carousel-nav-prev {
          left: var(--content-padding);
        }

        .awards-carousel-nav-next {
          right: var(--content-padding);
        }

        .awards-carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-xl);
          padding: 0 var(--content-padding);
        }

        .awards-carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .awards-carousel-dot:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .awards-carousel-dot.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(163, 230, 53, 0.5);
        }

        @media (max-width: 768px) {
          .awards-carousel-section {
            padding: var(--spacing-2xl) 0;
          }

          .awards-carousel-container {
            padding: 0 var(--content-padding);
          }

          .awards-carousel-slide {
            padding: 0 var(--spacing-xs);
          }

          .awards-image-wrapper {
            max-width: 100%;
            aspect-ratio: 3 / 2;
            border-radius: 12px;
          }

          .awards-carousel-nav {
            width: 40px;
            height: 40px;
          }

          .awards-carousel-nav-prev {
            left: var(--spacing-sm);
          }

          .awards-carousel-nav-next {
            right: var(--spacing-sm);
          }

          .awards-carousel-dots {
            margin-top: var(--spacing-lg);
          }
        }

        @media (max-width: 480px) {
          .awards-image-wrapper {
            aspect-ratio: 4 / 3;
          }

          .awards-carousel-nav {
            width: 36px;
            height: 36px;
          }

          .awards-carousel-nav svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </section>
  );
}

