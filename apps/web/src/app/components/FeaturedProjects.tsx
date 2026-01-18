"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";
import { useJobs } from "@/api/job/useJobs";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { JobWithClient } from "./ProjectList";

export const FeaturedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { data, isLoading } = useJobs();

  const allProjects =
    (data?.pages.flatMap((page) => page) as JobWithClient[]).slice(0, 5) || [];

  const nextSlide = () => {
    // Možemo se pomaknuti samo dok ne dođemo do zadnja 3 projekta
    if (currentIndex < allProjects.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Reset na početak
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(allProjects.length - 3); // Na zadnju moguću poziciju
    }
  };

  if (isLoading) return null;

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

      <div className="flex items-center justify-center gap-10 w-full relative">
        <button
          onClick={prevSlide}
          className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer hidden md:block z-20"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>

        {/* Ovaj kontejner definira vidljivu zonu za točno 3 kartice */}
        <div className="overflow-hidden" style={{ width: "1084px" }}>
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (340 + 32)}px)`,
            }}
          >
            {allProjects.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 flex flex-col group cursor-pointer"
                style={{ width: "340px" }}
                onClick={() => setSelectedJobId(p.id)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <Image
                    src={projectImg}
                    alt={p.title}
                    width={340}
                    height={380}
                    className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex justify-between items-center w-full text-white">
                      <span className="text-sm font-medium">View project</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-start w-full">
                    <h3 className="text-[#070415] font-bold text-xl leading-snug max-w-[70%] line-clamp-2">
                      {p.title}
                    </h3>
                    <span className="text-[#070415] font-bold text-xl">
                      ${Number(p.budget).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-400 uppercase text-sm mt-1">
                    {p.client?.name} {p.client?.surname}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer hidden md:block z-20"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>
      </div>

      <ProjectDetailsModal
        jobId={selectedJobId}
        onClose={() => setSelectedJobId(null)}
      />
    </section>
  );
};
