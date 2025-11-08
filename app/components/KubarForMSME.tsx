'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import msmeData from '../data/kubarForMSME.json';

export default function KubarForMSME() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % msmeData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + msmeData.length) % msmeData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIndex((prev) => (prev + 1) % msmeData.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getPrevIndex = (idx: number) => (idx - 1 + msmeData.length) % msmeData.length;
  const getNextIndex = (idx: number) => (idx + 1) % msmeData.length;

  return (
    <section className="msme-section">
      <div className="container">
        <div className="msme-content">
          <h2 className="msme-title">Kubar for MSMEs</h2>
          
          <div className="msme-carousel">
            {/* Left controls */}
            <div className="carousel-controls">
              <button onClick={prev} className="control-btn" aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
              </button>
            </div>

            {/* Center image stack */}
            <div className="carousel-image-stack">
              {/* Previous image */}
              <div key={`prev-${index}`} className="image-prev">
                <Image 
                  src={msmeData[getPrevIndex(index)].icon} 
                  alt={msmeData[getPrevIndex(index)].title} 
                  width={40} 
                  height={40}
                />
              </div>

              {/* Active image */}
              <div key={`active-${index}`} className="image-active">
                <Image 
                  src={msmeData[index].icon} 
                  alt={msmeData[index].title} 
                  width={80} 
                  height={80}
                />
              </div>

              {/* Next image */}
              <div key={`next-${index}`} className="image-next">
                <Image 
                  src={msmeData[getNextIndex(index)].icon} 
                  alt={msmeData[getNextIndex(index)].title} 
                  width={40} 
                  height={40}
                />
              </div>
            </div>

            {/* Right text */}
            <div className="carousel-text">
              <div key={`text-${index}`} className="text-content">
                <h3 className="text-title">{msmeData[index].text}</h3>
              </div>
            </div>

            {/* Bottom controls */}
            <div className="carousel-controls-bottom">
              <button onClick={next} className="control-btn" aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .msme-section {
          background: var(--color-background);
          padding: var(--spacing-3xl) 0;
        }

        .msme-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .msme-title {
          font-size: clamp(2rem, 4vw, 3rem);
          text-align: center;
          margin-bottom: var(--spacing-3xl);
          color: var(--color-text-primary);
        }

        .msme-carousel {
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-rows: 1fr auto;
          gap: var(--spacing-xl);
          align-items: center;
          min-height: 300px;
        }

        .carousel-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .carousel-controls-bottom {
          display: none;
        }

        .control-btn {
          background: var(--color-surface-elevated);
          border: 1.5px solid rgba(31, 76, 242, 0.3);
          border-radius: 12px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .control-btn:hover {
          background: var(--color-primary);
          color: #ffffff;
          border-color: var(--color-primary);
          transform: scale(1.1);
          box-shadow: 0 4px 20px rgba(31, 76, 242, 0.4);
        }

        .control-btn:active {
          transform: scale(0.95);
        }

        .carousel-image-stack {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .image-prev,
        .image-active,
        .image-next {
          position: absolute;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-prev {
          top: 0;
          opacity: 0.3;
          transform: scale(0.7) translateY(-20px);
          z-index: 1;
          filter: blur(1px);
        }

        .image-active {
          z-index: 3;
          opacity: 1;
          transform: scale(1);
          filter: drop-shadow(0 10px 30px rgba(31, 76, 242, 0.3));
        }

        .image-next {
          bottom: 0;
          opacity: 0.3;
          transform: scale(0.7) translateY(20px);
          z-index: 1;
          filter: blur(1px);
        }

        .carousel-text {
          grid-column: 1 / -1;
          text-align: center;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-content {
          animation: fadeInUp 0.5s ease-out;
        }

        .text-title {
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.4;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 769px) {
          .msme-carousel {
            grid-template-columns: auto 200px 1fr;
            grid-template-rows: 1fr;
          }

          .carousel-text {
            grid-column: 3;
            text-align: left;
          }

          .carousel-controls-bottom {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .msme-carousel {
            grid-template-columns: 1fr;
            grid-template-rows: auto 200px auto auto;
            gap: var(--spacing-lg);
          }

          .carousel-controls {
            display: none;
          }

          .carousel-controls-bottom {
            display: flex;
            justify-content: center;
            grid-column: 1;
          }

          .carousel-text {
            grid-column: 1;
          }

          .text-title {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}

