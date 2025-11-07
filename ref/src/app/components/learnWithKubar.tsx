import React from "react";

const LearnWithKubar: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-black flex flex-col items-center justify-center relative py-10">
      {/* Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center z-20
            bg-gradient-to-b
            from-black/40
            via-black/80
            to-black/40
            "
      >
        <span className="text-white text-4xl md:text-5xl font-bold">
          Coming Soon...
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[70%] p-6">
        <h1 className="text-5xl md:text-5xl font-bold text-center text-white mb-2">
          Learn with Kubar
        </h1>
        <p className="text-2xl text-center text-gray-300 mb-8">
          Listen to our Podcast to learn from Market Leaders
          {/* <span className="ml-2 inline-block align-middle">
            <svg
              className="w-4 h-4 inline"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span> */}
        </p>
        <div className="grid grid-cols-2 grid-rows-2 gap-8 h-[34rem]">
          {/* First Card: spans 2 rows */}
          <div
            className="rounded-xl p-8 md:p-10 flex flex-col justify-end h-full row-span-2 bg-cover bg-center"
            style={{ backgroundImage: "url('/kubar-ka-kissa.png')" }}
          >
            <span className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              Kubar Ka Kissa
            </span>
            <span className="text-gray-200 drop-shadow">
              Industry Learning Podcast
            </span>
          </div>
          {/* Second Card */}
          <div
            className="rounded-xl p-8 md:p-10 flex flex-col justify-end h-full row-span-1 bg-cover bg-center"
            style={{ backgroundImage: "url('/vyapar-nama.jpg')" }}
          >
            <span className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              Vyapar Nama By Kubar
            </span>
            <span className="text-gray-200 drop-shadow">
              Kubar's Newsletter
            </span>
          </div>
          {/* Third Card */}
          <div
            className="rounded-xl p-8 md:p-10 flex flex-col justify-end h-full row-span-1 bg-cover bg-center"
            style={{ backgroundImage: "url('/udyogpedia.jpg')" }}
          >
            <span className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
              Udyogpedia
            </span>
            <span className="text-gray-200 drop-shadow">
              MSME Knowledge Base
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnWithKubar;
