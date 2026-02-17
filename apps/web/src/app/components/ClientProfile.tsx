"use client";

import React, { useState } from "react";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";
import { PostProjectModal } from "./PostProjectModal";
import { useClientJobs } from "@/api/job/useClientJobs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ClientProfile = ({ profile }: { profile: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clientId = profile.userDetails?.id;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useClientJobs(clientId);

  const allJobs = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="w-full px-15 py-6">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-[#525fba] rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
          <span className="text-[10px]">PHOTO</span>
        </div>
        <h1 className="text-2xl font-bold text-[#070415]">
          {profile.userDetails?.name} {profile.userDetails?.surname}
        </h1>
      </div>

      <section className="mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#070415]">
              Personal Information
            </h2>
            <div className="text-gray-500 text-sm space-y-1 leading-relaxed font-medium">
              <p>Split, Croatia</p>
              <p>{profile.userDetails?.email}</p>
              <p>+385 95 123 4567</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
          >
            Post New Project
          </button>

          <PostProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            clientId={clientId}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-10 text-[#070415]">
          Posted Projects
        </h2>

        {isLoading ? (
          <p>Loading projects...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-14 gap-y-12">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                allJobs.map((job: any) => (
                  <div
                    key={job?.id}
                    className="flex flex-col group cursor-pointer"
                  >
                    <div className="relative h-[280px] w-full overflow-hidden rounded-xl mb-4">
                      <Image
                        src={projectImg}
                        alt={job?.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <h3 className="text-[#070415] font-bold text-[15px]">
                          {job?.title}
                        </h3>
                        <p className="text-gray-400 text-[12px] uppercase">
                          RISK
                        </p>
                      </div>
                      <span className="text-[#070415] font-bold text-[15px]">
                        ${job?.budget}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="bg-[#070415] text-white px-10 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-500"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More Jobs"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
