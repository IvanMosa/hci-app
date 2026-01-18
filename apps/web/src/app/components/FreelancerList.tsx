"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAllFreelancers } from "@/api/freelancer/useAllFreelancers";
import traitsImg from "../../../public/traits.png";
import defaultFreelancerImg from "../../../public/john-doe.png";

export const FreelancerList = () => {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useAllFreelancers();

  const allFreelancers = data?.pages.flatMap((page) => page) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#070415]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error loading freelancers.
      </div>
    );
  }

  return (
    <section className="bg-white pb-20">
      <div className="px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {allFreelancers.map((f) => (
          <div
            key={f.id}
            onClick={() => router.push(`/profile/${f.user?.id}`)}
            className="flex flex-col group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl mb-4 h-[360px]">
              <Image
                src={defaultFreelancerImg}
                alt={f.user?.name || "Freelancer"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="flex justify-between items-center w-full text-white">
                  <span className="text-sm font-medium">View profile</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="text-[#070415] font-bold text-lg leading-tight">
                  {f.user?.name} {f.user?.surname}
                </h3>
                <p className="text-gray-400 text-sm font-medium mt-1 capitalize">
                  {f.user?.type}
                </p>
              </div>

              <div className="pt-1">
                <Image
                  src={traitsImg}
                  alt="Freelancer traits"
                  width={85}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-[#070415] text-white px-8 py-3 rounded-full font-bold text-[12px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-sm disabled:bg-gray-400"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Freelancers"}
          </button>
        </div>
      )}
    </section>
  );
};
