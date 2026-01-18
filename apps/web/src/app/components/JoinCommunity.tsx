import Image from "next/image";
import Link from "next/link";

export const JoinCommunity = () => {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        height: "963.81px",
      }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/image 5.png"
          alt="Join Community"
          fill
          style={{
            objectFit: "cover",
            opacity: 1,
          }}
          priority
        />
        <div className="absolute inset-0 bg-[#070415C2]"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <h2
          className="text-white font-medium mb-12 tracking-normal"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(40px, 8vw, 64px)",
            lineHeight: "67px",
            fontWeight: 500,
          }}
        >
          Join a community built on trust,
          <br className="hidden md:block" />
          quality, and professionalism.
        </h2>

        <Link
          href="/login"
          className="inline-block bg-white text-[#070415] px-14 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-gray-200 transition-all shadow-lg"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
};
