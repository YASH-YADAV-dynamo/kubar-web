'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Assuming images are named img1.jpg, img2.jpg, etc. or img1.png, img2.png, etc.
// You can adjust the extension and count as needed
const getImagePaths = () => {
  const images = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  
  // Try to detect available images (you can also hardcode the count)
  // For now, let's assume we have images from img1 to img10
  for (let i = 1; i <= 10; i++) {
    // Try different extensions
    for (const ext of extensions) {
      images.push(`/carousel/img${i}${ext}`);
    }
  }
  
  return images;
};

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to load images - adjust the count based on your actual images
    // The component will work with however many images you have
    const imagePaths: string[] = [];
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    // Try to detect images (you can adjust the max count)
    for (let i = 1; i <= 20; i++) {
      for (const ext of extensions) {
        imagePaths.push(`/carousel/img${i}${ext}`);
      }
    }
    
    // For now, use a default set - replace with actual image detection if needed
    const defaultImages = [
      '/carousel/img1.jpg',
      '/carousel/img2.jpg',
      '/carousel/img3.jpg',
      '/carousel/img4.jpg',
      '/carousel/img5.jpg',
      '/carousel/img6.jpg',
    ];
    
    setImages(defaultImages);
  }, []);

  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // When we reach the end, loop back to 0 seamlessly
        if (next >= images.length) {
          return 0;
        }
        return next;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return null; // Don't render if no images
  }

  return (
    <section className="image-carousel-section">
      <div className="carousel-container" ref={carouselRef}>
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%) translateZ(0)`,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {images.map((src, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            const isNext = offset === 1 || (offset === -(images.length - 1));
            const isPrev = offset === -1 || (offset === images.length - 1);
            
            let transform = '';
            let opacity = 1;
            let zIndex = images.length - absOffset;
            let scale = 1;
            let filter = 'brightness(1)';
            
            if (isActive) {
              transform = 'translateZ(0px) scale(1)';
              scale = 1;
              opacity = 1;
              filter = 'brightness(1)';
            } else if (isNext || isPrev) {
              const translateZ = -200;
              const scale3d = 0.85;
              const translateX = offset * 50;
              transform = `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale3d})`;
              scale = scale3d;
              opacity = 0.7;
              filter = 'brightness(0.7) blur(2px)';
            } else {
              const translateZ = -400;
              const scale3d = 0.7;
              const translateX = offset * 30;
              transform = `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale3d})`;
              scale = scale3d;
              opacity = 0.4;
              filter = 'brightness(0.5) blur(4px)';
            }
            
            return (
              <div
                key={index}
                className="carousel-slide"
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter,
                }}
              >
                <Image
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  width={1200}
                  height={600}
                  className="carousel-image"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          className="carousel-nav carousel-nav-prev"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="carousel-nav carousel-nav-next"
          onClick={nextSlide}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .image-carousel-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
          background: var(--color-background);
          position: relative;
          overflow: visible;
        }

        .carousel-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--content-padding);
          perspective: 1500px;
          perspective-origin: center center;
          height: 500px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          align-items: center;
        }

        .carousel-slide {
          min-width: 100%;
          flex-shrink: 0;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease, filter 0.8s ease;
          will-change: transform, opacity, filter;
        }

        .carousel-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
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

        .carousel-nav:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
          border-color: var(--color-primary);
        }

        .carousel-nav-prev {
          left: var(--content-padding);
        }

        .carousel-nav-next {
          right: var(--content-padding);
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-xl);
          padding: 0 var(--content-padding);
        }

        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .carousel-dot:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .carousel-dot.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(163, 230, 53, 0.5);
        }

        @media (max-width: 768px) {
          .image-carousel-section {
            padding: var(--spacing-2xl) 0;
            overflow: hidden;
          }

          .carousel-container {
            padding: 0 var(--content-padding);
            height: 400px;
            perspective: 1000px;
          }

          .carousel-slide {
            border-radius: 16px;
          }

          .carousel-image {
            border-radius: 16px;
          }

          .carousel-nav {
            width: 40px;
            height: 40px;
          }

          .carousel-nav-prev {
            left: 1rem;
          }

          .carousel-nav-next {
            right: 1rem;
          }

          .carousel-dots {
            margin-top: var(--spacing-lg);
          }
        }

        @media (max-width: 480px) {
          .carousel-nav {
            width: 36px;
            height: 36px;
          }

          .carousel-nav svg {
            width: 18px;
            height: 18px;
          }

          .carousel-nav-prev {
            left: 0.5rem;
          }

          .carousel-nav-next {
            right: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}

