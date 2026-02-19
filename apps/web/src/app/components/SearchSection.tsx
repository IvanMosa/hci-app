"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import projectsIcon from "../../../public/Vector.png";
import freelancersIcon from "../../../public/people_alt.png";

export const SearchSection = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"projects" | "freelancers">("freelancers");

  const handleSearch = () => {
    const trimmed = query.trim();
    const params = new URLSearchParams();
    params.set("type", type);
    if (trimmed) params.set("search", trimmed);
    router.push(`/explore?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <h2 className="text-[#070415] mb-4 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
        What are you looking for?
      </h2>
      <p className="text-gray-400 text-base md:text-lg mb-10">
        Find the perfect freelancer or project for you
      </p>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setType("projects")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
            type === "projects"
              ? "bg-[#070415] text-white"
              : "bg-gray-100 text-[#070415] hover:bg-gray-200"
          }`}
        >
          <Image
            src={projectsIcon}
            alt="Projects"
            width={16}
            height={16}
            className={`object-contain ${type === "projects" ? "invert" : ""}`}
          />
          Projects
        </button>

        <button
          onClick={() => setType("freelancers")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
            type === "freelancers"
              ? "bg-[#070415] text-white"
              : "bg-gray-100 text-[#070415] hover:bg-gray-200"
          }`}
        >
          <Image
            src={freelancersIcon}
            alt="Freelancers"
            width={18}
            height={18}
            className={`object-contain ${type === "freelancers" ? "invert" : ""}`}
          />
          Freelancers
        </button>
      </div>

      <div className="relative px-4 w-full" style={{ maxWidth: "640px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            type === "freelancers"
              ? "Search freelancers by name or skill..."
              : "Search projects by title..."
          }
          className="w-full bg-gray-100 px-6 py-4 pr-14 rounded-full text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#070415]/20 transition-all"
        />
        <button
          onClick={handleSearch}
          className="absolute right-7 top-1/2 -translate-y-1/2 bg-[#070415] p-2.5 rounded-full hover:bg-gray-800 transition cursor-pointer"
        >
          <Search className="text-white w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
