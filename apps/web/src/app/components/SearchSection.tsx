import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import projectsIcon from "../../../public/Vector.png";
import freelancersIcon from "../../../public/people_alt.png";

export const SearchSection = () => {
  return (
    <section
      className="w-full flex flex-col items-center justify-center 
                 py-20 lg:py-0 
                 min-h-screen lg:h-[960.47px]"
    >
      <h2 className="text-[#070415] text-4xl md:text-5xl font-semibold mb-12">
        What are you looking for?
      </h2>

      <div className="flex gap-8 mb-8 text-[#070415]">
        <Link
          href="/project"
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition cursor-pointer"
        >
          <Image
            src={projectsIcon}
            alt="Projects"
            width={20}
            height={20}
            className="object-contain"
          />
          Projects
        </Link>

        <Link
          href="/freelancers"
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition cursor-pointer"
        >
          <Image
            src={freelancersIcon}
            alt="Freelancers"
            width={22}
            height={22}
            className="object-contain"
          />
          Freelancers
        </Link>
      </div>

      <div className="relative w-full max-w-2xl px-4">
        <input
          type="text"
          placeholder="Search freelancers, projects, etc."
          className="w-full bg-[#D9D9D9] py-4 px-6 rounded-full text-gray-700 placeholder-[#070415] focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
        />
        <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#070415] p-2.5 rounded-full hover:bg-gray-800 transition cursor-pointer">
          <Search className="text-white w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
