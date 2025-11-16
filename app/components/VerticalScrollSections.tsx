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
                <motion.div
                  animate={controls}
                  style={{ y, x: useMotionValue(0) }}
                  className="wheel-items"
                >
                  {[getIndex(-1), getIndex(0), getIndex(1)].map((i, idx) => {
                    const offset = idx - 1;
                    const baseY = offset * 120;
                    const baseX = offset * 120;
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const itemY = useTransform(
                      y,
                      [baseY - 120, baseY, baseY + 120],
                      [0.6, 1, 0.6]
                    );
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const itemX = useTransform(
                      y,
                      [baseX - 120, baseX, baseX + 120],
                      [0.6, 1, 0.6]
                    );
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const scale = useTransform(isMobile ? itemX : itemY, [0.6, 1], [0.95, 1.1]);
                    const opacity = isMobile ? itemX : itemY;
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const color = useTransform(
                      isMobile ? itemX : itemY, 
                      [0.6, 1], 
                      ["#4b5563", "#a3e635"]
                    );
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const filter = useTransform(
                      isMobile ? itemX : itemY,
                      [0.6, 1],
                      ["grayscale(100%) brightness(0.9)", "grayscale(0%) brightness(1.1)"]
                    );

                    return (
                      <motion.div
                        key={`${i}-${idx}`}
                        className="wheel-item"
                        style={{ scale, opacity }}
                      >
                        <motion.img
                          src={sections[i].image}
                          alt={sections[i].title}
                          className="wheel-image"
                          style={{ filter }}
                        />
                        <motion.span
                          className="wheel-title"
                          style={{ color }}
                        >
                          {sections[i].title}
                        </motion.span>
                      </motion.div>
                    );
                  })}
                </motion.div>
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
          padding: var(--spacing-2xl) 0;
          min-height: auto;
          display: flex;
          align-items: center;
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
      `}</style>
    </section>
  );
}
