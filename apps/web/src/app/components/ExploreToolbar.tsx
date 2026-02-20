"use client";

import { useState, useCallback } from "react";
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
    <div className="px-4 sm:px-8 md:px-10 lg:px-15 pt-6 pb-2 w-full">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full">
          <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => handleViewChange("projects")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md cursor-pointer ${
                view === "projects"
                  ? "bg-[#070415] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <Briefcase size={16} className="sm:w-[18px] sm:h-[18px]" />{" "}
              Projects
            </button>
            <button
              onClick={() => handleViewChange("freelancers")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md cursor-pointer ${
                view === "freelancers"
                  ? "bg-[#070415] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <Users size={16} className="sm:w-[18px] sm:h-[18px]" />{" "}
              Freelancers
            </button>
          </div>

          {view === "projects" && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2.5 border border-gray-200 rounded-[46px] text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors shrink-0 cursor-pointer ml-auto md:ml-0 md:order-last"
            >
              <Image
                src={filterIcon}
                alt="Filter"
                width={16}
                height={16}
                className="sm:w-[18px] sm:h-[18px]"
              />
              Filters
            </button>
          )}
        </div>

        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${view === "projects" ? "projects" : "freelancers"}`}
            className="w-full bg-gray-100 py-2.5 sm:py-3 px-5 sm:px-6 pr-12 rounded-full text-sm focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#070415] p-2 rounded-full text-white">
            <Search size={16} />
          </button>
        </div>
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
              <div className="flex gap-2">
                {[
                  { value: "all", label: "All" },
                  { value: "active", label: "Active" },
                  { value: "completed", label: "Completed" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleFilterChange("status", opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                      projectFilters.status === opt.value
                        ? "bg-[#070415] text-white border-[#070415]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#070415]/30 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
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
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={projectFilters.maxPrice}
                    step={500}
                    value={projectFilters.minPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        "minPrice",
                        Math.max(
                          0,
                          Math.min(
                            Number(e.target.value) || 0,
                            projectFilters.maxPrice,
                          ),
                        ),
                      )
                    }
                    placeholder="Min"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#070415]/20 focus:border-[#070415] transition-all"
                  />
                </div>
                <span className="text-gray-400 text-sm font-medium">–</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min={projectFilters.minPrice}
                    max={50000}
                    step={500}
                    value={projectFilters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxPrice",
                        Math.min(
                          50000,
                          Math.max(
                            Number(e.target.value) || 0,
                            projectFilters.minPrice,
                          ),
                        ),
                      )
                    }
                    placeholder="Max"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#070415]/20 focus:border-[#070415] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
