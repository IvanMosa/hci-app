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
    if (currentIndex < allFreelancers.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, allFreelancers.length - 3));
    }
  };

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

      <div className="flex items-center justify-center gap-4 w-full relative">
        {/* onClick mora biti na BUTTON elementu */}
        <button
          onClick={prevSlide}
          className="text-white p-2 hover:opacity-70 transition cursor-pointer hidden md:block z-30"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>

        <div className="overflow-hidden" style={{ width: "1084px" }}>
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (340 + 32)}px)`,
            }}
          >
            {allFreelancers.map((f, index) => (
              <div
                key={f.id || index}
                className="flex-shrink-0 flex flex-col group cursor-pointer"
                style={{ width: "340px" }}
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
                    <p className="text-gray-400 capitalize">{f.user?.type}</p>
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
        </div>

        <button
          onClick={nextSlide}
          className="text-white p-2 hover:opacity-70 transition cursor-pointer hidden md:block z-30"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>
      </div>

      <FreelancerDetailsModal
        freelancer={selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
      />
    </section>
  );
};
