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
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { data, isLoading } = useJobs();

  const allProjects =
    (data?.pages.flatMap((page) => page) as JobWithClient[])?.slice(0, 5) || [];

  // Fully responsive: calculate visible cards and sizes from screen width
  const arrowSpace = 80;
  const availableWidth = screenWidth - arrowSpace;
  const gap = screenWidth < 768 ? 16 : 24;
  const minCardWidth = 240;
  const maxCardWidth = 340;
  const visibleCards = Math.max(
    1,
    Math.min(3, Math.floor((availableWidth + gap) / (minCardWidth + gap))),
  );
  const cardWidth = Math.min(
    maxCardWidth,
    Math.floor((availableWidth - (visibleCards - 1) * gap) / visibleCards),
  );
  const containerWidth = visibleCards * cardWidth + (visibleCards - 1) * gap;

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
    <section className="bg-white w-full flex flex-col items-center justify-center relative px-2 sm:px-4 md:px-6 overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 z-10">
        <h2 className="text-[#070415] text-2xl sm:text-4xl md:text-6xl font-semibold mb-4 sm:mb-6 tracking-tight">
          Featured projects
        </h2>
        <p className="text-[#070415] text-sm sm:text-lg max-w-2xl mx-auto opacity-80">
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
          className="overflow-x-clip overflow-y-visible pb-2"
          style={{ width: `${containerWidth}px` }}
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
                <div className="relative overflow-hidden rounded-xl mb-3 sm:mb-4 aspect-[4/3] sm:aspect-[340/380]">
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
