import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import items from "../../data/kubarForNBFC.json";


// export default function KubarCarouselForNBFC() {
//   const [index, setIndex] = useState(0);

//   const next = () => setIndex((prev) => (prev + 1) % items.length);
//   const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

//   useEffect(() => {
//     const interval = setInterval(next, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const getPrevIndex = (idx: number) => (idx - 1 + items.length) % items.length;
//   const getNextIndex = (idx: number) => (idx + 1) % items.length;

//   return (
//     <div className="w-full bg-black text-white flex items-center justify-center h-[6--px]/v pt-10">
//       <div className="w-[80%] flex flex-col items-start space-y-6">
//         <h2 className="text-5xl font-bold flex items-center space-x-2 mb-10">
//           <span>Kubar for NBFCs</span>
//         </h2>
//         <div className="w-full flex items-center space-x-6">
//           {/* Left controls */}
//           <div className="w-[40%] flex flex-col items-center space-y-5">
//             <button onClick={prev} className="text-[#97E42A] hover:text-green-400">
//               <ArrowUp />
//             </button>
//             {/* <div className="text-[#97E42A] text-lg font-semibold">{items[index].title}</div> */}
//             <button onClick={next} className="text-[#97E42A] hover:text-green-400">
//               <ArrowDown />
//             </button>
//           </div>

//           {/* Center image stack */}
//           <div className="relative w-60 h-60 flex flex-col items-center justify-center overflow-hidden">
//             <AnimatePresence initial={false} mode="wait">
//               {/* Active image */}
//               <motion.div
//                 key={index}
//                 className="absolute top-1/2 transform -translate-y-1/2"
//                 initial={{ y: 40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -40, opacity: 0, filter: "blur(2px)" }} // Reduced blur
//                 transition={{ duration: 0.5 }}
//               >
//                 <Image src={items[index].icon} alt="icon" width={60} height={60} />
//               </motion.div>

//               {/* Previous image with slight blur effect */}
//               <motion.div
//                 key={`prev-${index}`}
//                 className="absolute top-0 opacity-30"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 0.3, y: 10 }}
//                 exit={{ opacity: 0, y: -40 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Image src={items[getPrevIndex(index)].icon} alt="icon-prev" width={40} height={40} />
//               </motion.div>

//               {/* Next image slides up from the bottom */}
//               <motion.div
//                 key={`next-${index}`}
//                 className="absolute bottom-0 opacity-30"
//                 initial={{ opacity: 0, y: 0 }}
//                 animate={{ opacity: 0.3, y: -10 }}
//                 exit={{ opacity: 0, y: -40 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Image src={items[getNextIndex(index)].icon} alt="icon-next" width={40} height={40} />
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Right text */}
//           <div className="w-[100%]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="text-2xl font-medium mb-2">{items[index].text}</div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Lightbulb, Handshake, Settings, ArrowLeftRight } from "lucide-react";

const features = [
  {
    "title": "Credit Inclusion",
    "icon": "/images/kupnbfc_1.svg",
    "text": "Future-Proof Your Portfolio With Smart Products "
},
{
    "title": "Smart Underwriting",
    "icon": "/images/kupnbfc_2.svg",
    "text": "Bridge The MSME Credit Gap & Drive Financial Inclusion "
},
{
    "title": "Digital Onboarding",
    "icon": "/images/kupnbfc_3.svg",
    "text": "Scale Lending Operations Efficiently And Profitably "
},
{
    "title": "Portfolio Insights",
    "icon": "/images/kupnbfc_4.svg",
    "text": "Scale Lending Operations Efficiently And Profitably"
}
];

export default function KubarCarouselForMSME() {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="w-full flex flex-col items-center space-y-6">
        <h2 className="text-5xl font-bold flex items-center space-x-2 mb-10">
          <span>Kubar for NBFCs</span>
        </h2>
      </div>
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-stretch gap-8 md:gap-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-1 text-center px-4 md:px-6 relative md:border-r-4 last:border-none border-white/200"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={feature.icon}
                alt={`${feature.title} icon`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h1 className="text-lg font-bold">{feature.text}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}
