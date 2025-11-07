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
import sections from "../../data/verticalScrollData.json";

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

  const scrollDown = async () => {
    await controls.start({
      y: isMobile ? 0 : -120,
      x: isMobile ? -120 : 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    setActiveIndex((prev) => (prev + 1) % sections.length);
    controls.set({ y: 0, x: 0 });
  };

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
    const interval = setInterval(() => {
      scrollDown();
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="flex flex-col w-[80%] md:flex-row h-screen bg-black text-white">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-[80px] flex md:flex-col items-center justify-between md:justify-center gap-6 bg-black py-4 md:py-0">
        <button onClick={() => goTo("up")}>
          <ChevronUp className="text-white hidden md:block" />
          <ChevronLeft className="text-white block md:hidden" />
        </button>
        <div className="flex md:flex-col gap-2">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-lime-400 scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
        <button onClick={() => goTo("down")}>
          <ChevronDown className="text-white hidden md:block" />
          <ChevronRight className="text-white block md:hidden" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-between px-6 md:px-16 py-6 gap-8">
        {/* Left: Wheel-Like Section */}
        <div className="w-full md:w-[250px] h-[300px] md:h-[400px] relative overflow-hidden flex items-center justify-center">
          <div className="relative h-full w-full overflow-hidden">
            <motion.div
              animate={controls}
              style={{ y, x: useMotionValue(0) }}
              className="flex md:flex-col flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-6"
            >
              {[getIndex(-1), getIndex(0), getIndex(1)].map((i, idx) => {
                const offset = idx - 1;
                const baseY = offset * 120;
                const baseX = offset * 120;
                const itemY = useTransform(
                  y,
                  [baseY - 120, baseY, baseY + 120],
                  [0.6, 1, 0.6]
                );
                const itemX = useTransform(
                  y,
                  [baseX - 120, baseX, baseX + 120],
                  [0.6, 1, 0.6]
                );
                const scale = useTransform(isMobile ? itemX : itemY, [0.6, 1], [0.95, 1.1]);
                const opacity = isMobile ? itemX : itemY;
                const color = useTransform(isMobile ? itemX : itemY, [0.6, 1], ["#4b5563", "#a3e635"]);
                const filter = useTransform(
                  isMobile ? itemX : itemY,
                  [0.6, 1],
                  ["grayscale(100%) brightness(0.9)", "grayscale(0%) brightness(1.1)"]
                );

                return (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center text-center gap-2 h-[120px] justify-center"
                    style={{ scale, opacity }}
                  >
                    <motion.img
                      src={sections[i].image}
                      alt={sections[i].title}
                      className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain"
                      style={{ filter }}
                    />
                    <motion.span
                      className="text-base md:text-xl font-semibold w-[160px] md:w-[200px]"
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
        <div className="flex-1 w-full max-w-4xl md:pl-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                {sections[activeIndex].headline}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-left text-base md:text-xl list-disc pl-5">
                {sections[activeIndex].content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
