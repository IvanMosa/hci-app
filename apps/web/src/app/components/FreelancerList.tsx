"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Users } from "lucide-react";
import {
  FreelancerWithUser,
  useAllFreelancers,
} from "@/api/freelancer/useAllFreelancers";
import traitsImg from "../../../public/traits.png";
import defaultFreelancerImg from "../../../public/john-doe.png";
import { FreelancerDetailsModal } from "./FreelancerDetailsModal";

export const FreelancerList = ({ searchQuery }: { searchQuery: string }) => {
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<FreelancerWithUser | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("userId"));
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllFreelancers(searchQuery);

  const allFreelancers = data?.pages.flatMap((page) => page) || [];

  const filteredFreelancers = allFreelancers.filter((f) => {
    if (currentUserId && f.user?.id === currentUserId) return false;
    const fullName = `${f.user?.name} ${f.user?.surname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  return (
    <section className="bg-white pb-20 min-h-[80vh]">
      <div className="px-8 sm:px-8 md:px-10 lg:px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 mt-6 md-16 justify-items-center sm:justify-items-stretch">
        {filteredFreelancers.length === 0 && !isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <Users size={48} className="mb-4 text-gray-300" />
            <p className="text-xl font-medium">No freelancers found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchQuery
                ? `No results matching "${searchQuery}"`
                : "Try adjusting your filters to find what you're looking for"}
            </p>
          </div>
        )}

        {filteredFreelancers.map((f) => (
          <div
            key={f.id}
            onClick={() => setSelectedFreelancer(f)}
            className="flex flex-col group cursor-pointer max-w-[320px] sm:max-w-none w-full"
          >
            <div className="relative overflow-hidden rounded-xl mb-4 h-[280px]">
              <Image
                src={f.imageUrl || defaultFreelancerImg}
                alt={f.user?.name || "Freelancer"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized={!!f.imageUrl}
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

      <FreelancerDetailsModal
        freelancer={selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
      />

      {hasNextPage && filteredFreelancers.length > 0 && (
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
