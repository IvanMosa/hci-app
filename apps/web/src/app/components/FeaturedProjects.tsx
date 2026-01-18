"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";
import { useJobs } from "@/api/job/useJobs";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { JobWithClient } from "./ProjectList";

export const FeaturedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data, isLoading } = useJobs();

  const allProjects =
    (data?.pages.flatMap((page) => page) as JobWithClient[])?.slice(0, 5) || [];

  const cardWidth = isMobile ? 300 : 340;
  const gap = isMobile ? 16 : 32;
  const visibleCards = isMobile ? 1 : 3;

  const nextSlide = () => {
    const limit = allProjects.length - visibleCards;
    if (currentIndex < limit) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      const limit = allProjects.length - visibleCards;
      setCurrentIndex(Math.max(0, limit));
    }
  };

  if (isLoading) return null;

  return (
    <section
      className="bg-white w-full flex flex-col items-center justify-center relative px-4 md:px-6 overflow-hidden py-20"
      style={{ minHeight: "960.47px" }}
    >
      <div className="text-center mb-16 z-10">
        <h2 className="text-[#070415] text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
          Featured projects
        </h2>
        <p className="text-[#070415] text-lg max-w-2xl mx-auto opacity-80">
          Apply to projects that best match your skills and interests.
        </p>
      </div>

      <div className="flex items-center justify-center w-full max-w-7xl mx-auto">
        <button
          onClick={prevSlide}
          className="text-[#070415] p-1 md:p-2 hover:opacity-70 transition cursor-pointer z-20 shrink-0"
        >
          <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
        </button>

        <div
          className="overflow-hidden"
          style={{ width: isMobile ? `${cardWidth}px` : "1084px" }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
            }}
          >
            {allProjects.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 flex flex-col group cursor-pointer"
                style={{ width: `${cardWidth}px` }}
                onClick={() => setSelectedJobId(p.id)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[340/380]">
                  <Image
                    src={projectImg}
                    alt={p.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex justify-between items-center w-full text-white">
                      <span className="text-sm font-medium">View project</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <div className="flex justify-between items-start w-full gap-2">
                    <h3 className="text-[#070415] font-bold text-lg md:text-xl leading-tight truncate">
                      {p.title}
                    </h3>
                    <span className="text-[#070415] font-bold text-lg md:text-xl shrink-0">
                      ${Number(p.budget).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-400 uppercase text-xs md:text-sm mt-1">
                    {p.client?.name} {p.client?.surname}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="text-[#070415] p-1 md:p-2 hover:opacity-70 transition cursor-pointer z-20 shrink-0"
        >
          <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
        </button>
      </div>

      <ProjectDetailsModal
        jobId={selectedJobId}
        onClose={() => setSelectedJobId(null)}
      />
    </section>
  );
};
