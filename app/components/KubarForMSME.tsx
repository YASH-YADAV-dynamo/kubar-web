'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import msmeData from '../data/kubarForMSME.json';

export default function KubarForMSME() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % msmeData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getPrevIndex = (idx: number) => (idx - 1 + msmeData.length) % msmeData.length;
  const getNextIndex = (idx: number) => (idx + 1) % msmeData.length;

  return (
    <section className="msme-section">
      <div className="container">
        <div className="msme-content">
          <h2 className="msme-title">Kubar for MSMEs</h2>
          
          <div className="msme-carousel">
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
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          gap: var(--spacing-xl);
          align-items: center;
          justify-items: center;
          min-height: 300px;
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
          text-align: center;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
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
            grid-template-columns: 200px 1fr;
            grid-template-rows: 1fr;
            gap: var(--spacing-2xl);
          }

          .carousel-text {
            text-align: left;
          }
        }

        @media (max-width: 768px) {
          .msme-carousel {
            gap: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
}

