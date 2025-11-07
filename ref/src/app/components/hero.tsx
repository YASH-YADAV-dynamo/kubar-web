"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-screen bg-black">
      
      {/* Background Image */}
      <Image
        src="/landing.png"
        alt="Landing Background"
        layout="fill"
        objectFit="contain"
        priority
      />

      {/* Navbar inline */}
      <nav className="absolute w-full py-4 px-6 bg-transparent shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* <span className="text-xl font-nunito text-white underline" onClick={() => {
            window.open('https://kubar.tech/', '_blank');
          }}>
            MSME Resource Hub
          </span> */}
          {/* <button className="px-8 py-2 border border-white text-white rounded font-nunito hover:bg-white hover:text-blue-600 transition">
            Login
          </button> */}
        </div>
      </nav>

      {/* Text Box at Center with Space */}
      <div className="absolute w-[90%] md:w-[50%] top-[85%] left-1/2 transform -translate-x-1/2">
        <div className="w-full bg-transparent bg-opacity-80 shadow-md rounded text-center">
          <p className="text-xs md:text-lg font-product-sans text-white">
            At Kubar, we believe every small business deserves a share of the
            khazana. That's why we've built the Kubar Protocol — a smart, secure
            way to connect MSMEs with the right banks and NBFCs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
