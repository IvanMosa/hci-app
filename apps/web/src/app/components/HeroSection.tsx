import bgImage from "../../../public/image 10.png";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="relative w-full lg:w-1/2 min-h-[45vh] lg:min-h-0 lg:h-[calc(100vh-72px)] lg:sticky lg:top-[72px] lg:self-start bg-zinc-900 flex items-center justify-center px-6 py-8 lg:px-8 lg:py-12 overflow-hidden z-10">
      <Image
        src={bgImage}
        alt="Background Image"
        priority
        quality={100}
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
          Get started in just a few clicks
        </h1>
      </div>
    </div>
  );
};
