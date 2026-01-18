"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import freelancer1 from "../../../public/john-doe.png";
import skillsIcon from "../../../public/traits.png";
import { useState } from "react";
import {
  FreelancerWithUser,
  useAllFreelancers,
} from "@/api/freelancer/useAllFreelancers";
import { FreelancerDetailsModal } from "./FreelancerDetailsModal";

export const FeaturedFreelancers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading } = useAllFreelancers();
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<FreelancerWithUser | null>(null);

  const allFreelancers = data?.pages.flatMap((page) => page).slice(0, 5) || [];

  const nextSlide = () => {
    if (allFreelancers.length <= 3) return;
    setCurrentIndex((prev) => (prev + 1) % (allFreelancers.length - 2));
  };

  const prevSlide = () => {
    if (allFreelancers.length <= 3) return;
    setCurrentIndex((prev) =>
      prev === 0 ? allFreelancers.length - 3 : prev - 1,
    );
  };

  const visibleFreelancers = allFreelancers.slice(
    currentIndex,
    currentIndex + 3,
  );

  if (isLoading) return null;
  return (
    <section
      className="bg-[#05050C] w-full flex flex-col items-center justify-center relative px-6 overflow-hidden"
      style={{ minHeight: "960.47px" }}
    >
      <div className="text-center mb-16 z-10">
        <h2 className="text-white text-5xl md:text-6xl font-semibold mb-4">
          Featured freelancers
        </h2>
        <p className="text-white text-lg">
          Qualified experts with proven experience. Choose the one that fits
          your project best.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 w-full max-w-7xl relative">
        <button className="text-white p-2 hover:opacity-70 transition cursor-pointer hidden md:block">
          <ChevronLeft onClick={prevSlide} size={48} strokeWidth={1} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleFreelancers.map((f, index) => (
            <div
              key={index}
              className="flex flex-col group cursor-pointer"
              onClick={() => setSelectedFreelancer(f)}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <Image
                  src={freelancer1}
                  alt={f.user?.name}
                  width={340}
                  height={380}
                  className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex justify-between items-center w-full text-white">
                    <span className="text-sm font-medium">View profile</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-xl">
                    {f.user?.name} {f.user?.surname}
                  </h3>
                  <p className="text-gray-400">{f.user?.type}</p>
                </div>
                <Image
                  src={skillsIcon}
                  alt="Skills"
                  width={100}
                  height={20}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="text-white p-2 hover:opacity-70 transition cursor-pointer hidden md:block">
          <ChevronRight onClick={nextSlide} size={48} strokeWidth={1} />
        </button>
      </div>

      <FreelancerDetailsModal
        freelancer={selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
      />
    </section>
  );
};
