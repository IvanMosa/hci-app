"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Search, Briefcase, Users, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import filterIcon from "../../../public/filter_list.png";
import { ProjectFilters } from "../explore/ExploreClient";

interface ToolbarProps {
  view: "projects" | "freelancers";
  setView: (val: "projects" | "freelancers") => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  projectFilters: ProjectFilters;
  setProjectFilters: React.Dispatch<React.SetStateAction<ProjectFilters>>;
}

export const ExploreToolbar = ({
  view,
  setView,
  searchQuery,
  setSearchQuery,
  projectFilters,
  setProjectFilters,
}: ToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const handleViewChange = (newView: "projects" | "freelancers") => {
    setView(newView);
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", newView);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = useCallback(
    (key: keyof ProjectFilters, value: string | number) => {
      setProjectFilters((prev) => ({ ...prev, [key]: value }));
    },
    [setProjectFilters],
  );

  const clearFilters = () => {
    setProjectFilters({
      status: "all",
      minPrice: 0,
      maxPrice: 50000,
      projectName: "",
      clientName: "",
    });
  };

  const hasActiveFilters =
    projectFilters.status !== "all" ||
    projectFilters.minPrice > 0 ||
    projectFilters.maxPrice < 50000 ||
    projectFilters.projectName !== "" ||
    projectFilters.clientName !== "";

  return (
    <div className="px-15 pt-6 pb-2 w-full">
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
              <Briefcase size={18} /> Projects
            </button>
            <button
              onClick={() => handleViewChange("freelancers")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-md cursor-pointer ${
                view === "freelancers"
                  ? "bg-[#070415] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <Users size={18} /> Freelancers
            </button>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${view === "projects" ? "projects" : "freelancers"}`}
              className="w-full bg-gray-100 py-3 px-6 pr-12 rounded-full text-sm focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#070415] p-2 rounded-full text-white">
              <Search size={16} />
            </button>
          </div>
        </div>

        {view === "projects" && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-[46px] text-sm font-semibold hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
          >
            <Image src={filterIcon} alt="Filter" width={18} height={18} />
            Filters
          </button>
        )}
      </div>

      {/* Project Filters Panel */}
      {view === "projects" && showFilters && (
        <div className="mt-4 bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-[#070415] uppercase tracking-wider">
              Filter Projects
            </h3>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-[#070415] font-medium transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-[#070415] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Status Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Status
              </label>
              <select
                value={projectFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#070415]/20 focus:border-[#070415] transition-all cursor-pointer appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Project Name Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Project Name
              </label>
              <input
                type="text"
                value={projectFilters.projectName}
                onChange={(e) =>
                  handleFilterChange("projectName", e.target.value)
                }
                placeholder="Filter by name..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#070415]/20 focus:border-[#070415] transition-all"
              />
            </div>

            {/* Client Name Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Client Name
              </label>
              <input
                type="text"
                value={projectFilters.clientName}
                onChange={(e) =>
                  handleFilterChange("clientName", e.target.value)
                }
                placeholder="Filter by client..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#070415]/20 focus:border-[#070415] transition-all"
              />
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Budget Range
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  ${projectFilters.minPrice.toLocaleString()}
                </span>
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    step={500}
                    value={projectFilters.minPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        "minPrice",
                        Math.min(
                          Number(e.target.value),
                          projectFilters.maxPrice,
                        ),
                      )
                    }
                    className="w-full accent-[#070415] cursor-pointer"
                  />
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    step={500}
                    value={projectFilters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxPrice",
                        Math.max(
                          Number(e.target.value),
                          projectFilters.minPrice,
                        ),
                      )
                    }
                    className="w-full accent-[#070415] cursor-pointer"
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  ${projectFilters.maxPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
