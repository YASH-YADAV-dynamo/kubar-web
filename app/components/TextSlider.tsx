'use client';

export default function TextSlider() {
  return (
    <div className="text-slider">
      {/* Left fade */}
      <div className="slider-fade slider-fade-left" />

      {/* Right fade */}
      <div className="slider-fade slider-fade-right" />

      {/* Scrolling content */}
      <div className="slider-content">
        <span className="slider-text">
          Popular Choice Award at Startup Mahakumbh 2025 • #6/2M in Top 19 Fintech Startups by F6S • Recognized by STPI Sangam • As Featured on Ashoka Uni's Blog & Reflections • People Choice Award at Startup Mahakumbh 2025 • #6/2M in Top 19 Fintech Startups by F6S • Recognized by STPI Sangam • As Featured on Ashoka Uni's Blog & Reflections
        </span>
      </div>

      <style jsx>{`
        .text-slider {
          position: relative;
          overflow: hidden;
          background: var(--color-background);
          padding: var(--spacing-xl) 0;
        }

        .slider-fade {
          position: absolute;
          top: 0;
          height: 100%;
          width: 10rem;
          z-index: 10;
          pointer-events: none;
        }

        .slider-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--color-background), var(--color-background) 20%, transparent);
        }

        .slider-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--color-background), var(--color-background) 20%, transparent);
        }

        .slider-content {
          display: inline-block;
          white-space: nowrap;
          animation: slide 30s linear infinite;
          padding: 0 var(--spacing-2xl);
        }

        .slider-text {
          font-size: clamp(1.25rem, 2.5vw, 2rem);
          font-weight: 500;
          color: var(--color-text-primary);
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (min-width: 768px) {
          .slider-fade {
            width: 16rem;
          }
        }
      `}</style>
    </div>
  );
}

