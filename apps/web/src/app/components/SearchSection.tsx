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
      <h2
        className="text-[#070415] mb-12 text-center"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "64px",
          lineHeight: "67px",
          letterSpacing: "0px",
        }}
      >
        What are you looking for?
      </h2>

      <div className="flex gap-8 mb-8 text-[#070415]">
        <Link
          href="/explore?type=projects"
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
          href="/explore?type=freelancers"
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

      <div className="relative px-4 w-full" style={{ maxWidth: "867px" }}>
        <input
          type="text"
          placeholder="Search freelancers, projects, etc."
          className="w-full bg-[#D9D9D9] px-8 rounded-full text-gray-700 placeholder-[#070415] focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          style={{ height: "80px" }}
        />
        <button className="absolute right-8 top-1/2 -translate-y-1/2 bg-[#070415] p-3.5 rounded-full hover:bg-gray-800 transition cursor-pointer">
          <Search className="text-white w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
