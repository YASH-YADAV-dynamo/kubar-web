"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import sections from "../data/verticalScrollData.json";

interface Section {
  title: string;
  content: string[];
  headline: string;
  image: string;
}

export default function VerticalScrollSections() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const y = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getIndex = (offset: number) => {
    return (activeIndex + offset + sections.length) % sections.length;
  };

  const goTo = (dir: "up" | "down") => {
    setActiveIndex((prev) =>
      dir === "up"
        ? prev === 0
          ? sections.length - 1
          : prev - 1
        : prev === sections.length - 1
        ? 0
        : prev + 1
    );
  };

  useEffect(() => {
    const scrollDown = async () => {
      await controls.start({
        y: isMobile ? 0 : -120,
        x: isMobile ? -120 : 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      setActiveIndex((prev) => (prev + 1) % sections.length);
      controls.set({ y: 0, x: 0 });
    };

    const interval = setInterval(() => {
      scrollDown();
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, controls]);

  return (
    <section className="vertical-scroll-section">
      <div className="container">
        <div className="vertical-scroll-wrapper">
          {/* Sidebar Navigation */}
          <div className="sidebar-nav">
            <button 
              onClick={() => goTo("up")} 
              className="nav-button"
              aria-label="Previous section"
            >
              <ChevronUp className="chevron-up" />
              <ChevronLeft className="chevron-left" />
            </button>
            <div className="nav-dots">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`nav-dot ${i === activeIndex ? "active" : ""}`}
                  aria-label={`Section ${i + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => goTo("down")} 
              className="nav-button"
              aria-label="Next section"
            >
              <ChevronDown className="chevron-down" />
              <ChevronRight className="chevron-right" />
            </button>
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
          justify-content: space-between;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: var(--spacing-md);
          gap: var(--spacing-md);
        }

        @media (min-width: 768px) {
          .sidebar-nav {
            width: 80px;
            flex-direction: column;
            justify-content: center;
            padding: var(--spacing-lg) var(--spacing-sm);
            gap: var(--spacing-lg);
          }
        }

        .nav-button {
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          padding: var(--spacing-xs);
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
          min-width: 40px;
          min-height: 40px;
        }

        .nav-button:hover {
          background: var(--color-surface-elevated);
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        .nav-button:active {
          transform: translateY(0);
        }

        .chevron-up,
        .chevron-down {
          display: none;
        }

        @media (min-width: 768px) {
          .chevron-up,
          .chevron-down {
            display: block;
          }
          .chevron-left,
          .chevron-right {
            display: none;
          }
        }

        .chevron-left,
        .chevron-right {
          display: block;
        }

        .nav-dots {
          display: flex;
          flex-direction: row;
          gap: var(--spacing-xs);
          align-items: center;
        }

        @media (min-width: 768px) {
          .nav-dots {
            flex-direction: column;
          }
        }

        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-border);
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .nav-dot.active {
          background: #a3e635;
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(163, 230, 53, 0.4);
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
          overflow: hidden;
        }

        .wheel-items {
          display: flex;
          flex-direction: row;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          gap: var(--spacing-lg);
        }

        @media (min-width: 768px) {
          .wheel-items {
            flex-direction: column;
          }
        }

        .wheel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--spacing-xs);
          height: 120px;
          justify-content: center;
        }

        .wheel-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        @media (min-width: 768px) {
          .wheel-image {
            width: 60px;
            height: 60px;
          }
        }

        .wheel-title {
          font-size: 0.95rem;
          font-weight: 600;
          width: 140px;
          font-family: var(--font-heading);
          line-height: 1.3;
        }

        @media (min-width: 768px) {
          .wheel-title {
            font-size: 1.15rem;
            width: 180px;
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
          gap: var(--spacing-lg);
        }

        .content-headline {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          line-height: 1.3;
          color: var(--color-text-primary);
          font-family: var(--font-heading);
        }

        .content-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-md);
          color: var(--color-text-secondary);
          text-align: left;
          font-size: 1rem;
          line-height: 1.7;
          list-style: none;
          padding: 0;
        }

        @media (min-width: 768px) {
          .content-list {
            grid-template-columns: repeat(2, 1fr);
            font-size: 1.1rem;
          }
        }

        .content-list li {
          position: relative;
          padding-left: var(--spacing-lg);
        }

        .content-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #a3e635;
          font-size: 1.5rem;
          line-height: 1;
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
