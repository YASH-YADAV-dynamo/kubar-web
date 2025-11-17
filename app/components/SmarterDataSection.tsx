'use client';

import { useState, useEffect, useRef } from 'react';

export default function SmarterDataSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      title: "Faster borrower onboarding",
      description: "Streamline the process with automated verification"
    },
    {
      title: "Lower risk through verified data",
      description: "Make informed decisions with trusted information"
    },
    {
      title: "Higher match accuracy in pilot programs",
      description: "Precise matching for better outcomes"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.benefit-slide') as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth + parseFloat(getComputedStyle(firstCard).marginRight || '0');
        container.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
        setCurrentIndex(index);
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.benefit-slide') as HTMLElement;
      if (firstCard) {
        const scrollLeft = container.scrollLeft;
        const cardWidth = firstCard.offsetWidth + parseFloat(getComputedStyle(firstCard).marginRight || '0');
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(Math.min(newIndex, benefits.length - 1));
      }
    }
  };

  return (
    <section className="smarter-data-section">
      <div className="smarter-data-container">
        <div className="smarter-data-content">
          <div className="smarter-data-header">
            <h2 className="smarter-data-title">
              <span className="title-word">Smarter</span>
              <span className="title-word">Data.</span>
              <span className="title-word">Lower</span>
              <span className="title-word">Risk.</span>
              <span className="title-word">Better</span>
              <span className="title-word">Reach.</span>
            </h2>
            <p className="smarter-data-description">
              We help lenders find, evaluate, and onboard MSMEs with verified trade and transaction data. Our approach reduces manual verification, improves risk assessment accuracy, and supports faster disbursals while building trust on both sides of the ecosystem.
            </p>
          </div>

          <div 
            className={`benefits-grid ${isMobile ? 'benefits-slider' : ''}`}
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`benefit-card ${hoveredCard === index ? 'hovered' : ''} ${isMobile ? 'benefit-slide' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="benefit-card-inner">
                  <div className="benefit-icon-wrapper">
                    <div className="benefit-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                  <div className="benefit-glow"></div>
                </div>
              </div>
            ))}
          </div>

          {isMobile && (
            <div className="slider-indicators">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  className={`slider-indicator ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .smarter-data-section {
          width: 100%;
          padding: var(--spacing-3xl) var(--content-padding);
          background: var(--color-background);
          position: relative;
          overflow: hidden;
        }

        .smarter-data-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .smarter-data-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .smarter-data-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3xl);
        }

        .smarter-data-header {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .smarter-data-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--spacing-xl);
          font-family: var(--font-heading);
          letter-spacing: -0.03em;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.3em;
        }

        .title-word {
          display: inline-block;
          background: linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ffffff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
          position: relative;
        }

        .title-word:nth-child(2),
        .title-word:nth-child(4),
        .title-word:nth-child(6) {
          color: #ffd700;
          -webkit-text-fill-color: #ffd700;
          background: none;
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .smarter-data-description {
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .benefit-card {
          position: relative;
          perspective: 1000px;
        }

        .benefit-card-inner {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 24px;
          padding: var(--spacing-2xl);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .benefit-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .benefit-card.hovered::before {
          opacity: 1;
        }

        .benefit-card.hovered .benefit-card-inner {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 215, 0, 0.5);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 215, 0, 0.2) inset,
            0 8px 32px rgba(255, 215, 0, 0.2);
        }

        .benefit-icon-wrapper {
          margin-bottom: var(--spacing-lg);
          position: relative;
        }

        .benefit-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%);
          border: 1px solid rgba(255, 215, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffd700;
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
        }

        .benefit-card.hovered .benefit-icon {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%);
          box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
        }

        .benefit-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          transition: width 0.6s ease, height 0.6s ease;
          pointer-events: none;
          z-index: 0;
        }

        .benefit-card.hovered .benefit-glow {
          width: 200px;
          height: 200px;
        }

        .benefit-title {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
          position: relative;
          z-index: 2;
          line-height: 1.3;
        }

        .benefit-description {
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .smarter-data-section {
            padding: var(--spacing-2xl) 0;
          }

          .smarter-data-content {
            gap: var(--spacing-2xl);
          }

          .benefits-grid.benefits-slider {
            display: flex;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: 0;
            padding: 0 var(--content-padding);
            margin: 0;
            max-width: 100%;
          }

          .benefits-grid.benefits-slider::-webkit-scrollbar {
            display: none;
          }

          .benefit-card.benefit-slide {
            min-width: calc(100% - var(--content-padding) * 2);
            width: calc(100% - var(--content-padding) * 2);
            flex-shrink: 0;
            scroll-snap-align: start;
            margin-right: var(--spacing-lg);
          }

          .benefit-card.benefit-slide:last-child {
            margin-right: 0;
          }

          .benefit-card-inner {
            padding: var(--spacing-xl);
          }

          .slider-indicators {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            margin-top: var(--spacing-xl);
            padding: 0 var(--content-padding);
          }

          .slider-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 215, 0, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
          }

          .slider-indicator:hover {
            background: rgba(255, 215, 0, 0.5);
            transform: scale(1.2);
          }

          .slider-indicator.active {
            background: #ffd700;
            width: 24px;
            border-radius: 4px;
          }
        }

        @media (max-width: 480px) {
          .smarter-data-title {
            font-size: 2rem;
            gap: 0.2em;
          }

          .benefit-card-inner {
            padding: var(--spacing-lg);
          }
        }
      `}</style>
    </section>
  );
}

