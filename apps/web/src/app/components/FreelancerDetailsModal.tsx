"use client";

import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import defaultFreelancerImg from "../../../public/john-doe.png";
import portfolioImg from "../../../public/image 6.png";
import { FreelancerWithUser } from "@/api/freelancer/useAllFreelancers";

interface FreelancerDetailsModalProps {
  freelancer: FreelancerWithUser | null;
  onClose: () => void;
}

export const FreelancerDetailsModal = ({
  freelancer,
  onClose,
}: FreelancerDetailsModalProps) => {
  if (!freelancer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[1250px] relative shadow-2xl overflow-hidden min-h-[750px] p-16">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-black z-20"
        >
          <X size={28} className="cursor-pointer" />
        </button>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                <Image
                  src={defaultFreelancerImg}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-baseline gap-4">
                <h2 className="text-[20px] font-bold text-[#070415] whitespace-nowrap">
                  {freelancer.user?.name} {freelancer.user?.surname}
                </h2>
                <span className="text-[#34A853] text-[14px] font-medium whitespace-nowrap">
                  Available for work
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <button className="text-[#070415] font-bold text-[14px] underline underline-offset-4 hover:text-gray-600 transition-all">
                Download my portfolio
              </button>
              <button className="bg-[#070415] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                Work with freelancer
              </button>
            </div>
          </div>

          <div
            className="relative w-full overflow-hidden shadow-sm self-center"
            style={{
              height: "550px",
              borderRadius: "11.72px",
            }}
          >
            <Image
              src={portfolioImg}
              alt="Portfolio work"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
