"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import sections from "../data/verticalScrollData.json";

interface Section {
  title: string;
  content: string[];
  headline: string;
  image: string;
}

export default function VerticalScrollSections() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section className="vertical-scroll-section">
      <div className="container">
        <div className="vertical-scroll-wrapper">
          {/* Sidebar Navigation - Dots Only */}
          <div className="sidebar-nav">
            <div className="nav-dots">
              {sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`nav-dot ${i === activeIndex ? "active" : ""}`}
                  aria-label={`Go to section ${i + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Left: Wheel-Like Section */}
            <div className="wheel-container">
              <div className="wheel-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.8, y: isMobile ? 20 : 0, x: isMobile ? 0 : 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: isMobile ? -20 : 0, x: isMobile ? 0 : -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="wheel-item-active"
                  >
                    <div className="wheel-image-wrapper">
                      <img
                        src={sections[activeIndex].image}
                        alt={sections[activeIndex].title}
                        className="wheel-image"
                      />
                    </div>
                    <div className="wheel-title-wrapper">
                      <span className="wheel-title">
                        {sections[activeIndex].title}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Headline + List */}
            <div className="content-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="content-wrapper"
                >
                  <h2 className="content-headline">
                    {sections[activeIndex].headline}
                  </h2>
                  <ul className="content-list">
                    {sections[activeIndex].content.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Pause Button */}
      <button
        onClick={togglePause}
        className="pause-button"
        aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
        type="button"
      >
        {isPaused ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        )}
      </button>

      <style jsx>{`
        .vertical-scroll-section {
          background: var(--color-background);
          color: var(--color-text-primary);
          padding: var(--spacing-2xl) 0;
          min-height: auto;
          display: flex;
          align-items: center;
          position: relative;
        }

        .vertical-scroll-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: var(--spacing-md);
        }

        @media (min-width: 768px) {
          .vertical-scroll-wrapper {
            flex-direction: row;
            gap: var(--spacing-lg);
          }
        }

        .sidebar-nav {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          padding: var(--spacing-md);
        }

        @media (min-width: 768px) {
          .sidebar-nav {
            width: 60px;
            flex-direction: column;
            justify-content: center;
            padding: var(--spacing-lg) 0;
          }
        }

        .nav-dots {
          display: flex;
          flex-direction: row;
          gap: var(--spacing-sm);
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .nav-dots {
            flex-direction: column;
            gap: var(--spacing-md);
          }
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-border);
          border: 2px solid transparent;
          transition: all var(--transition-base);
          cursor: pointer;
          padding: 0;
          margin: 0;
          position: relative;
        }

        .nav-dot:hover {
          background: var(--color-text-tertiary);
          transform: scale(1.2);
        }

        .nav-dot.active {
          background: #a3e635;
          border-color: rgba(163, 230, 53, 0.3);
          transform: scale(1.4);
          box-shadow: 0 0 16px rgba(163, 230, 53, 0.5);
        }

        .nav-dot.active::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-lg);
          width: 100%;
        }

        @media (min-width: 768px) {
          .main-content {
            flex-direction: row;
            align-items: center;
            gap: var(--spacing-xl);
          }
        }

        .wheel-container {
          width: 100%;
          height: auto;
          min-height: 200px;
          position: relative;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .wheel-container {
            width: 200px;
            height: auto;
            min-height: 300px;
          }
        }

        .wheel-inner {
          position: relative;
          height: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .wheel-item-active {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: var(--spacing-md);
          width: 100%;
        }

        .wheel-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          order: 1;
        }

        .wheel-image {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(163, 230, 53, 0.3));
        }

        @media (min-width: 768px) {
          .wheel-image {
            width: 100px;
            height: 100px;
          }
        }

        .wheel-title-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          order: 2;
        }

        .wheel-title {
          font-size: 1.1rem;
          font-weight: 600;
          max-width: 200px;
          font-family: var(--font-heading);
          line-height: 1.4;
          color: #a3e635;
          text-align: center;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        @media (min-width: 768px) {
          .wheel-title {
            font-size: 1.25rem;
            max-width: 220px;
          }
        }

        .content-panel {
          flex: 1;
          width: 100%;
          max-width: 100%;
        }

        @media (min-width: 768px) {
          .content-panel {
            max-width: 650px;
            padding-left: var(--spacing-lg);
          }
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .content-headline {
          font-size: clamp(1.1rem, 2.2vw, 1.5rem);
          font-weight: 700;
          line-height: 1.35;
          color: var(--color-text-primary);
          font-family: var(--font-heading);
          letter-spacing: -0.01em;
          margin-bottom: var(--spacing-xs);
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          max-width: 100%;
          text-align: left;
        }

        .content-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-sm);
          color: var(--color-text-secondary);
          text-align: left;
          font-size: 0.95rem;
          line-height: 1.6;
          list-style: none;
          padding: 0;
        }

        @media (min-width: 768px) {
          .content-list {
            grid-template-columns: repeat(2, 1fr);
            font-size: 1rem;
            gap: var(--spacing-md);
          }
        }

        .content-list li {
          position: relative;
          padding-left: var(--spacing-lg);
          padding-top: 0;
        }

        .content-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: 0;
          color: #a3e635;
          font-size: 1.5rem;
          line-height: 1.6;
          font-weight: 700;
        }

        @media (max-width: 767px) {
          .vertical-scroll-section {
            padding: var(--spacing-2xl) 0;
            min-height: auto;
          }

          .wheel-container {
            height: 240px;
          }

          .content-panel {
            text-align: center;
          }

          .content-list {
            text-align: left;
          }
        }

        .pause-button {
          position: absolute;
          bottom: var(--spacing-lg);
          right: var(--spacing-lg);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(163, 230, 53, 0.15);
          border: 2px solid rgba(163, 230, 53, 0.4);
          color: #a3e635;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .pause-button:hover {
          background: rgba(163, 230, 53, 0.25);
          border-color: rgba(163, 230, 53, 0.6);
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(163, 230, 53, 0.3);
        }

        .pause-button:active {
          transform: scale(0.95);
        }

        .pause-button svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 767px) {
          .pause-button {
            bottom: var(--spacing-md);
            right: var(--spacing-md);
            width: 40px;
            height: 40px;
          }

          .pause-button svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </section>
  );
}
