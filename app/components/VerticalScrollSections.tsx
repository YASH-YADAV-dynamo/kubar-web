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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
                    <img
                      src={sections[activeIndex].image}
                      alt={sections[activeIndex].title}
                      className="wheel-image"
                    />
                    <span className="wheel-title">
                      {sections[activeIndex].title}
                    </span>
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

      <style jsx>{`
        .vertical-scroll-section {
          background: var(--color-background);
          color: var(--color-text-primary);
          padding: var(--spacing-3xl) 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .vertical-scroll-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: var(--spacing-lg);
        }

        @media (min-width: 768px) {
          .vertical-scroll-wrapper {
            flex-direction: row;
            gap: var(--spacing-xl);
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
          gap: var(--spacing-xl);
          width: 100%;
        }

        @media (min-width: 768px) {
          .main-content {
            flex-direction: row;
            align-items: center;
            gap: var(--spacing-2xl);
          }
        }

        .wheel-container {
          width: 100%;
          height: 280px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .wheel-container {
            width: 280px;
            height: 450px;
          }
        }

        .wheel-inner {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wheel-item-active {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--spacing-md);
          justify-content: center;
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

        .wheel-title {
          font-size: 1.1rem;
          font-weight: 600;
          max-width: 200px;
          font-family: var(--font-heading);
          line-height: 1.4;
          color: #a3e635;
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
            max-width: 600px;
            padding-left: var(--spacing-xl);
          }
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .content-headline {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          line-height: 1.4;
          color: var(--color-text-primary);
          font-family: var(--font-heading);
          letter-spacing: -0.01em;
          margin-bottom: var(--spacing-sm);
        }

        .content-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-lg);
          color: var(--color-text-secondary);
          text-align: left;
          font-size: 1.05rem;
          line-height: 1.8;
          list-style: none;
          padding: 0;
        }

        @media (min-width: 768px) {
          .content-list {
            grid-template-columns: repeat(2, 1fr);
            font-size: 1.125rem;
            gap: var(--spacing-xl);
          }
        }

        .content-list li {
          position: relative;
          padding-left: var(--spacing-xl);
          padding-top: var(--spacing-xs);
        }

        .content-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: var(--spacing-xs);
          color: #a3e635;
          font-size: 1.75rem;
          line-height: 1;
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
      `}</style>
    </section>
  );
}
