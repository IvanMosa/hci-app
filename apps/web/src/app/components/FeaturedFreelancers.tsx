"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import freelancer1 from "../../../public/john-doe.png";
import skillsIcon from "../../../public/traits.png";
import { useState, useEffect } from "react";
import {
  FreelancerWithUser,
  useAllFreelancers,
} from "@/api/freelancer/useAllFreelancers";
import { FreelancerDetailsModal } from "./FreelancerDetailsModal";

export const FeaturedFreelancers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { data, isLoading } = useAllFreelancers();
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<FreelancerWithUser | null>(null);

  // Provjera širine ekrana za klijentsku logiku
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const allFreelancers = data?.pages.flatMap((page) => page).slice(0, 5) || [];

  // Dinamičke vrijednosti ovisno o ekranu
  const cardWidth = isMobile ? 300 : 340; // Malo uža kartica na mobitelu da stane uz strelice
  const gap = isMobile ? 16 : 32; // Manji razmak na mobitelu
  const visibleCards = isMobile ? 1 : 3;

  const nextSlide = () => {
    const limit = allFreelancers.length - visibleCards;
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
      const limit = allFreelancers.length - visibleCards;
      setCurrentIndex(Math.max(0, limit));
    }
  };

  if (isLoading) return null;

  return (
    <section
      className="bg-[#05050C] w-full flex flex-col items-center justify-center relative px-4 md:px-6 overflow-hidden py-20"
      style={{ minHeight: "960.47px" }}
    >
      <div className="text-center mb-16 z-10">
        <h2 className="text-white text-3xl md:text-6xl font-semibold mb-4">
          Featured freelancers
        </h2>
        <p className="text-white text-base md:text-lg max-w-2xl mx-auto opacity-80">
          Qualified experts with proven experience. Choose the one that fits
          your project best.
        </p>
      </div>

      <div className="flex items-center justify-center w-full max-w-7xl mx-auto">
        <button
          onClick={prevSlide}
          className="text-white p-2 hover:opacity-70 transition cursor-pointer z-30 shrink-0"
        >
          <ChevronLeft className="w-6 h-6 md:w-12 md:h-12" strokeWidth={1} />
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
            {allFreelancers.map((f, index) => (
              <div
                key={f.id || index}
                className="flex-shrink-0 flex flex-col group cursor-pointer"
                style={{ width: `${cardWidth}px` }}
                onClick={() => setSelectedFreelancer(f)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[340/380]">
                  <Image
                    src={freelancer1}
                    alt={f.user?.name || "Freelancer"}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex justify-between items-center w-full text-white">
                      <span className="text-sm font-medium">View profile</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div className="max-w-[65%]">
                    <h3 className="text-white font-bold text-lg md:text-xl truncate">
                      {f.user?.name} {f.user?.surname}
                    </h3>
                    <p className="text-gray-400 capitalize text-sm">
                      {f.user?.type}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Image
                      src={skillsIcon}
                      alt="Skills"
                      width={80}
                      height={16}
                      className="mt-1 md:w-[100px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="text-white p-2 hover:opacity-70 transition cursor-pointer z-30 shrink-0"
        >
          <ChevronRight className="w-6 h-6 md:w-12 md:h-12" strokeWidth={1} />
        </button>
      </div>

      <FreelancerDetailsModal
        freelancer={selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
      />
    </section>
  );
};
