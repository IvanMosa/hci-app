import Image from "next/image";
import userImage from "../../../public/Ellipse 2.png";

export const Testimonials = () => {
  return (
    <section
      className="bg-[#05050C] w-full flex flex-col items-center justify-center relative px-6 overflow-hidden text-center"
      style={{ minHeight: "960.47px" }}
    >
      <h2 className="text-white text-5xl md:text-7xl font-semibold mb-20 tracking-tight">
        What our users say
      </h2>

      <div className="max-w-4xl mx-auto mb-16 px-4">
        <p className="text-gray-300 text-xl md:text-3xl font-light italic leading-relaxed">
          "Freelancia helped me find consistent work within the first week. The
          clients here actually value quality, and the platform makes everything
          simple."
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-700">
          <Image src={userImage} alt="Ana P." fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-white font-bold text-lg md:text-xl">Ana P.</h4>
          <p className="text-gray-400 text-sm md:text-base">
            Creative Studio Founder
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        {[...Array(6)].map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === 0 ? "bg-white scale-110" : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
