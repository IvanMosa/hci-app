import React from "react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="relative w-full lg:w-1/2 min-h-[80vh] bg-zinc-900 flex items-center justify-center px-8 overflow-hidden z-10">
      <Image
        src="/image 10.png"
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-md text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Get started in just a few clicks
        </h1>
      </div>
    </div>
  );
};
