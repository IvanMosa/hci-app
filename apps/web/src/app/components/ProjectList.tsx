"use client";

import React from "react";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";
import { useJobs } from "@/api/job/useJobs";
import { Job } from "@/api/job/useClientJobs";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

export interface JobWithClient extends Job {
  client: {
    name: string;
    surname: string;
  };
}

export const ProjectList = ({ searchQuery }: { searchQuery: string }) => {
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useJobs(searchQuery);

  const allJobs =
    (data?.pages.flatMap((page) => page) as JobWithClient[]) || [];

  const filteredJobs = allJobs.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading)
    return <div className="text-center py-20 font-bold">Loading...</div>;
  return (
    <section className="bg-white pb-20">
      <div className="px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-14 gap-y-12 mt-10">
        {filteredJobs.length === 0 && !isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-xl font-medium">
              No projects found for "{searchQuery}"
            </p>
          </div>
        )}

        {filteredJobs.map((p) => (
          <div
            key={p.id}
            className="flex flex-col group cursor-pointer"
            onClick={() => setSelectedJobId(p.id)}
          >
            <div className="relative overflow-hidden rounded-xl mb-4 h-[280px]">
              <Image
                src={projectImg}
                alt={p?.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

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
