import Image from 'next/image';

const ExpandBussiness = () => {
  return (
    <div className="w-full py-16 bg-black relative">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center mb-4 text-white">
        Expand Your Business with Kubar
      </h1>

      {/* Sub Heading with Arrow */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <h2 className="text-2xl text-center text-gray-300">
          Learn more
        </h2>
        <Image
          src="/arrow.svg"
          alt="Arrow"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>

      {/* Gradient Overlay Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left Gradient */}
        <div className="absolute left-0 top-0 w-[401.9px] h-[479.6px] bg-gradient-to-r from-black to-transparent z-10" />
        
        {/* Right Gradient */}
        <div className="absolute right-0 top-0 w-[401.9px] h-[479.6px] bg-gradient-to-l from-black to-transparent z-10" />

        {/* Image Container */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Left End Image (4) */}
            <div className="w-[calc(20%-16px)] min-w-[200px] h-64 md:h-72 lg:h-80 flex-shrink-0">
              <Image
                src="/business_4.png"
                alt="Business 4"
                width={256}
                height={320}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Mid Left Image (2) */}
            <div className="w-[calc(20%-16px)] min-w-[200px] h-64 md:h-72 lg:h-80 flex-shrink-0">
              <Image
                src="/business_2.png"
                alt="Business 2"
                width={256}
                height={320}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Center Image (1) */}
            <div className="w-[calc(20%-16px)] min-w-[200px] h-64 md:h-72 lg:h-80 flex-shrink-0">
              <Image
                src="/business_1.png"
                alt="Business 1"
                width={256}
                height={320}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Mid Right Image (3) */}
            <div className="w-[calc(20%-16px)] min-w-[200px] h-64 md:h-72 lg:h-80 flex-shrink-0">
              <Image
                src="/business_3.png"
                alt="Business 3"
                width={256}
                height={320}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right End Image (5) */}
            <div className="w-[calc(20%-16px)] min-w-[200px] h-64 md:h-72 lg:h-80 flex-shrink-0">
              <Image
                src="/business_5.png"
                alt="Business 5"
                width={256}
                height={320}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandBussiness;
