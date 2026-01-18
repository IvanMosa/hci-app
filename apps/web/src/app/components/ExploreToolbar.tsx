"use client";

import React from "react";
import Image from "next/image";
import { Search, Briefcase, Users } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import filterIcon from "../../../public/filter_list.png";

interface ToolbarProps {
  view: "projects" | "freelancers";
  setView: (val: "projects" | "freelancers") => void;
}

export const ExploreToolbar = ({ view, setView }: ToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleViewChange = (newView: "projects" | "freelancers") => {
    setView(newView);

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", newView);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="px-15 pb-6 w-full">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-1 items-center gap-4 w-full">
          <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => handleViewChange("projects")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-md cursor-pointer ${
                view === "projects"
                  ? "bg-[#070415] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <Briefcase size={18} />
              Projects
            </button>
            <button
              onClick={() => handleViewChange("freelancers")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-md cursor-pointer ${
                view === "freelancers"
                  ? "bg-[#070415] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <Users size={18} />
              Freelancers
            </button>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder={`Search ${view === "projects" ? "projects" : "freelancers"}`}
              className="w-full bg-gray-100 py-3 px-6 pr-12 rounded-full text-sm focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#070415] p-2 rounded-full text-white">
              <Search size={16} />
            </button>
          </div>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-[46px] text-sm font-semibold hover:bg-gray-50 transition-colors shrink-0 cursor-pointer">
          <Image src={filterIcon} alt="Filter" width={18} height={18} />
          Filters
        </button>
      </div>
    </div>
  );
};
