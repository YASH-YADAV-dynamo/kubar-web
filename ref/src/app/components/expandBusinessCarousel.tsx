"use client";
import { useRef, useEffect } from "react";

const imageCards = [
  "/images/expand/card1.svg",
  "/images/expand/card2.svg",
  "/images/expand/card3.svg",
  "/images/expand/card4.svg",
];

export default function KubarCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const scrollWidth = scrollEl.scrollWidth / 2;
      if (scrollEl.scrollLeft >= scrollWidth) {
        scrollEl.scrollLeft = 0;
      }
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-black text-white py-12 px-4 sm:px-8 text-center relative pb-25">
      <h2 className="text-6xl sm:text-5xl font-bold mb-2">Expand Your Business with Kubar</h2>
      <a
        href="#"
        className="text-2xl text-gray-300 underline inline-flex items-center gap-1 mb-6"
      >
        Learn More <span>↗</span>
      </a>

      <div className="relative mt-6">
        {/* Scrollable card container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-4"
        >
          {[...imageCards, ...imageCards].map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[300px] sm:h-[360px] md:h-[400px] bg-white rounded-xl overflow-hidden"
            >
              <img
                src={src}
                alt={`Card ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Left gradient */}
        <div className="absolute top-0 left-0 h-full w-[20%] xl:w-40 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        {/* Right gradient */}
        <div className="absolute top-0 right-0 h-full w-[20%] xl:w-40 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
