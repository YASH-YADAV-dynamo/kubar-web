'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    '/awards/img1.jpg',
    '/awards/img2.jpg',
    '/awards/img3.jpg',
    '/awards/img4.jpg',
    '/awards/img5.jpg',
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="awards-section">
      <div className="container">
        <h2 className="awards-heading">Product Showcase</h2>
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
            {images.map((src, index) => {
              const isVertical = src.includes('img4.jpg');
              return (
                <div key={index} className="award-slide">
                  <div className={`award-image-wrapper ${isVertical ? 'vertical-image' : ''}`}>
                    <Image
                      src={src}
                      alt={`Award ${index + 1}`}
                      width={800}
                      height={600}
                      className={`award-image ${isVertical ? 'vertical' : 'horizontal'}`}
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            className="award-carousel-nav award-carousel-nav-prev"
            onClick={prevSlide}
            aria-label="Previous award"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="award-carousel-nav award-carousel-nav-next"
            onClick={nextSlide}
            aria-label="Next award"
          >
            <ChevronRight size={20} />
          </button>

          {/* Navigation Dots */}
          <div className="award-carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`award-carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to award ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .awards-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          background: var(--color-background);
        }

        .awards-heading {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          color: var(--color-text-primary);
          font-family: var(--font-heading);
        }

        .awards-carousel-container {
          position: relative;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 var(--content-padding);
          overflow: hidden;
        }

        .awards-carousel-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          width: 100%;
        }

        .award-slide {
          min-width: 100%;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 var(--spacing-sm);
          box-sizing: border-box;
        }

        .award-image-wrapper {
          width: 100%;
          max-width: 100%;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          background: var(--color-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          max-height: 600px;
        }

        .award-image-wrapper.vertical-image {
          max-width: 500px;
          margin: 0 auto;
        }

        .award-image {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .award-image.vertical {
          object-fit: contain;
          max-height: 600px;
        }

        .award-carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .award-carousel-nav:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translateY(-50%) scale(1.1);
          border-color: var(--color-primary);
        }

        .award-carousel-nav-prev {
          left: var(--spacing-md);
        }

        .award-carousel-nav-next {
          right: var(--spacing-md);
        }

        .award-carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-lg);
          padding: 0 var(--content-padding);
        }

        .award-carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .award-carousel-dot:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .award-carousel-dot.active {
          background: #ffd700;
          border-color: #ffd700;
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(163, 230, 53, 0.5);
        }

        @media (max-width: 768px) {
          .awards-section {
            padding: var(--spacing-2xl) 0;
          }

          .awards-carousel-container {
            padding: 0 var(--content-padding);
          }

          .award-slide {
            padding: 0;
          }

          .award-image-wrapper {
            width: 100%;
            max-width: 100%;
            min-height: auto;
            max-height: calc(100vh - 200px);
            border-radius: 12px;
          }

          .award-image-wrapper.vertical-image {
            max-width: 100%;
            max-height: calc(100vh - 200px);
          }

          .award-image {
            width: 100%;
            height: auto;
            max-height: calc(100vh - 200px);
            object-fit: contain;
          }

          .award-image.vertical {
            object-fit: contain;
            max-height: calc(100vh - 200px);
          }

          .award-carousel-nav {
            width: 36px;
            height: 36px;
          }

          .award-carousel-nav-prev {
            left: var(--spacing-xs);
          }

          .award-carousel-nav-next {
            right: var(--spacing-xs);
          }

          .award-carousel-dots {
            margin-top: var(--spacing-md);
          }
        }

        @media (max-width: 480px) {
          .awards-section {
            padding: var(--spacing-xl) 0;
          }

          .award-image-wrapper {
            max-height: calc(100vh - 180px);
            border-radius: 10px;
          }

          .award-image-wrapper.vertical-image {
            max-height: calc(100vh - 180px);
          }

          .award-image {
            max-height: calc(100vh - 180px);
          }

          .award-image.vertical {
            max-height: calc(100vh - 180px);
          }

          .award-carousel-nav {
            width: 32px;
            height: 32px;
          }

          .award-carousel-nav svg {
            width: 16px;
            height: 16px;
          }

          .award-carousel-nav-prev {
            left: 0.5rem;
          }

          .award-carousel-nav-next {
            right: 0.5rem;
          }

          .award-carousel-dots {
            margin-top: var(--spacing-sm);
            gap: 0.5rem;
          }

          .award-carousel-dot {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </section>
  );
}

