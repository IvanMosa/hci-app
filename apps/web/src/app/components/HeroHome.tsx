import Link from "next/link";

const HeroHome = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] lg:h-[960px] overflow-hidden bg-[#070415]">
      <div
        className="absolute w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: "url('/image 3.png')",
          top: "-56px",
          height: "calc(100% + 56px)",
        }}
      >
        <div className="absolute inset-0 bg-[#070415]/76"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] max-w-5xl">
          Find the right freelancer.
          <br />
          Faster than ever.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-xl font-light">
          A platform that connects talented freelancers with clients ready to
          collaborate.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <Link
            href="/explore?type=freelancers"
            className="bg-white text-[#070415] px-10 py-4 rounded-full font-bold uppercase text-[13px] tracking-widest hover:bg-gray-200 transition-colors w-64 sm:w-auto"
          >
            Find Freelancers
          </Link>

          <Link
            href="/explore?type=projects"
            className="border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase text-[13px] tracking-widest hover:bg-white hover:text-[#070415] transition-all w-64 sm:w-auto"
          >
            Find a Job
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
