import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"; // Dodaj ArrowRight
import Image from "next/image";
import Link from "next/link";
import projectImg from "../../../public/image 4.png";

export const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Website design + development",
      price: "$1200",
      client: "RISK",
    },
    {
      id: 2,
      title: "Website design + development",
      price: "$1200",
      client: "RISK",
    },
    {
      id: 3,
      title: "Website design + development",
      price: "$1200",
      client: "RISK",
    },
  ];

  return (
    <section
      className="bg-white w-full flex flex-col items-center justify-center relative px-6 overflow-hidden"
      style={{ minHeight: "960.47px" }}
    >
      <div className="text-center mb-16 z-10 pt-20 lg:pt-0">
        <h2 className="text-[#070415] text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
          Featured projects
        </h2>
        <p className="text-[#070415] text-lg">
          Apply to projects that best match your skills and interests.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 w-full max-w-7xl relative">
        <button className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer hidden md:block">
          <ChevronLeft size={48} strokeWidth={1} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <div key={index} className="flex flex-col group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <Image
                  src={projectImg}
                  alt={p.title}
                  width={340}
                  height={380}
                  className="object-cover w-full h-auto transition-all duration-500"
                />

                {/* HOVER OVERLAY (Pretvara se u tamni gradijent na dnu) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex justify-between items-center w-full text-white">
                    <span className="text-sm font-medium">View project</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-[#070415] font-bold text-xl leading-snug max-w-[70%]">
                    {p.title}
                  </h3>
                  <span className="text-[#070415] font-bold text-xl">
                    {p.price}
                  </span>
                </div>
                <p className="text-gray-400 uppercase text-sm mt-1">
                  {p.client}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer hidden md:block">
          <ChevronRight size={48} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
};
