"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import projectImg from "../../../public/image 4.png";
import { useJobs } from "@/api/job/useJobs";
import { Job } from "@/api/job/useClientJobs";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { ProjectFilters } from "../explore/ExploreClient";
import { useState } from "react";

export interface JobWithClient extends Job {
  client: {
    name: string;
    surname: string;
  };
}

export const ProjectList = ({
  searchQuery,
  filters,
}: {
  searchQuery: string;
  filters?: ProjectFilters;
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useJobs(searchQuery);

  const allJobs =
    (data?.pages.flatMap((page) => page) as JobWithClient[]) || [];

  const filteredJobs = allJobs.filter((p) => {
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    if (!filters) return true;

    if (filters.status !== "all" && p.status !== filters.status) return false;

    if (
      filters.projectName &&
      !p.title.toLowerCase().includes(filters.projectName.toLowerCase())
    )
      return false;

    if (filters.clientName) {
      const clientFullName =
        `${p.client?.name ?? ""} ${p.client?.surname ?? ""}`.toLowerCase();
      if (!clientFullName.includes(filters.clientName.toLowerCase()))
        return false;
    }

    const budget = Number(p.budget || 0);
    if (budget < filters.minPrice || budget > filters.maxPrice) return false;

    return true;
  });

  if (isLoading)
    return <div className="text-center py-20 font-bold">Loading...</div>;
  return (
    <section className="bg-white pb-20 min-h-[80vh]">
      <div className="px-8 sm:px-8 md:px-10 lg:px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 sm:gap-x-8 lg:gap-x-10 xl:gap-x-14 lg:gap-y-12 mt-10 md:mt-16 justify-items-center sm:justify-items-stretch">
        {filteredJobs.length === 0 && !isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <Briefcase size={48} className="mb-4 text-gray-300" />
            <p className="text-xl font-medium">No projects found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchQuery
                ? `No results matching "${searchQuery}"`
                : "Try adjusting your filters to find what you're looking for"}
            </p>
          </div>
        )}

        {filteredJobs.map((p) => (
          <div
            key={p.id}
            className="flex flex-col group cursor-pointer max-w-[320px] sm:max-w-none w-full"
            onClick={() => setSelectedJobId(p.id)}
          >
            <div className="relative overflow-hidden rounded-xl mb-4 h-[280px]">
              <Image
                src={p.imageUrl || projectImg}
                alt={p?.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized={!!p.imageUrl}
              />

              <span
                className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm ${
                  p.status === "active"
                    ? "bg-green-100/90 text-green-700"
                    : p.status === "completed"
                      ? "bg-blue-100/90 text-blue-700"
                      : "bg-gray-100/90 text-gray-600"
                }`}
              >
                {p.status}
              </span>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="flex justify-between items-center w-full text-white">
                  <span className="text-sm font-medium">View project</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-start w-full">
                <h3 className="text-[#070415] font-bold text-[15px] leading-tight max-w-[70%]">
                  {p.title}
                </h3>
                <span className="text-[#070415] font-bold text-[15px]">
                  ${Number(p.budget).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-medium mt-1 uppercase tracking-wider">
                {p.client?.name} {p.client?.surname}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ProjectDetailsModal
        jobId={selectedJobId}
        onClose={() => setSelectedJobId(null)}
      />

      {hasNextPage && filteredJobs.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-[#070415] text-white px-10 py-4 rounded-full font-bold text-[12px] uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-500"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Projects"}
          </button>
        </div>
      )}
    </section>
  );
};
