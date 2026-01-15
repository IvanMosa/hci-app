import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"; // Dodan ArrowRight
import freelancer1 from "../../../public/john-doe.png";
import freelancer2 from "../../../public/kristy-doe.png";
import skillsIcon from "../../../public/traits.png";

export const FeaturedFreelancers = () => {
  const freelancers = [
    { id: 1, name: "John Doe", role: "Designer", img: freelancer1 },
    { id: 2, name: "Kristy Doe", role: "Designer", img: freelancer2 },
    { id: 3, name: "John Doe", role: "Designer", img: freelancer1 },
  ];

  return (
    <section
      className="bg-[#05050C] w-full flex flex-col items-center justify-center relative px-6 overflow-hidden"
      style={{ minHeight: "960.47px" }}
    >
      <div className="text-center mb-16 z-10">
        <h2 className="text-white text-5xl md:text-6xl font-semibold mb-4">
          Featured freelancers
        </h2>
        <p className="text-white text-lg">
          Qualified experts with proven experience. Choose the one that fits
          your project best.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 w-full max-w-7xl relative">
        <button className="text-white p-2 hover:opacity-70 transition cursor-pointer hidden md:block">
          <ChevronLeft size={48} strokeWidth={1} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {freelancers.map((f, index) => (
            <div key={index} className="flex flex-col group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                {/* Slika freelancera */}
                <Image
                  src={f.img}
                  alt={f.name}
                  width={340}
                  height={380}
                  className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
                />

                {/* HOVER OVERLAY: Gradijent i tekst "View profile" */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex justify-between items-center w-full text-white">
                    <span className="text-sm font-medium">View profile</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>

              {/* Detalji ispod slike */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-xl">{f.name}</h3>
                  <p className="text-gray-400">{f.role}</p>
                </div>
                <Image
                  src={skillsIcon}
                  alt="Skills"
                  width={100}
                  height={20}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="text-white p-2 hover:opacity-70 transition cursor-pointer hidden md:block">
          <ChevronRight size={48} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
};
