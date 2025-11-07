import React from "react";

const TextSlider = () => {
    return (
        <div className="relative overflow-hidden bg-black text-white p-10 md:p-20">
            {/* Left fade */}
            <div className="absolute top-0 left-0 w-10 md:w-64 h-full z-10 pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent" />
            
            {/* Right fade */}
            <div className="absolute top-0 right-0 w-10 md:w-64 h-full z-10 pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent" />

            {/* Scrolling content */}
            <div className="inline-block whitespace-nowrap animate-slide px-20">
                <span className="text-2xl md:text-4xl font-product-sans">
                    Popular Choice Award at Startup Mahakumbh 2025 • #6/2M in Top 19 Fintech Startups by F6S • Recognized by STPI Sangam • As Featured on Ashoka Uni’s Blog & Reflections • People Choice Award at Startup Mahakumbh 2025 • #6/2M in Top 19 Fintech Startups by F6S • Recognized by STPI Sangam • As Featured on Ashoka Uni’s Blog & Reflections
                </span>
            </div>

            {/* CSS for animation */}
            <style>
                {`
                @keyframes slide {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .animate-slide {
                    animation: slide 30s linear infinite;
                }
                `}
            </style>
        </div>
    );
};

export default TextSlider;
