"use client";

import React from "react";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";

export const ClientProfile = ({ profile }: { profile: any }) => {
  return (
    <div className="w-full px-15 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-[#525fba] rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
          <span className="text-[10px]">PHOTO</span>
        </div>
        <h1 className="text-2xl font-bold text-[#070415]">
          {profile.userDetails?.name} {profile.userDetails?.surname}
        </h1>
      </div>

      <section className="mb-20">
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
          <button className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
            Post New Project
          </button>
        </div>
      </section>

      {/* Posted Projects Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-10 text-[#070415]">
          Posted Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[23px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col group cursor-pointer">
              <div className="relative h-[360px] w-full overflow-hidden rounded-xl mb-4">
                <Image
                  src={projectImg}
                  alt="Project"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-[#070415] font-bold text-[15px]">
                  Website design
                </h3>
                <span className="text-[#070415] font-bold text-[15px]">
                  $1200
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
