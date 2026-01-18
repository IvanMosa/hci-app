"use client";

import React from "react";
import Image from "next/image";
import johnDoeImg from "../../../public/john-doe.png";

export const FreelancerProfile = ({ profile }: { profile: any }) => {
  return (
    <div className="w-full px-15 py-12 bg-white">
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src={johnDoeImg}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#070415]">
            {profile.userDetails?.name} {profile.userDetails?.surname}
          </h1>
        </div>

        <div className="text-right">
          <p className="text-3xl font-light text-[#070415]">
            Balance:{" "}
            <span className="font-bold">${profile.balance || "5,230"}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-start mb-24">
        <section>
          <h2 className="text-2xl font-bold mb-8 text-[#070415]">
            Personal Information
          </h2>
          <div className="text-gray-500 text-[15px] space-y-1 font-medium leading-relaxed">
            <p>{profile?.location}</p>
            <p>{profile.userDetails?.email}</p>
            <p>+385 95 123 4567</p>
          </div>
        </section>

        <section className="flex items-center gap-6 pt-2">
          <span className="font-bold text-sm cursor-pointer text-[#070415] hover:underline transition-all">
            Portfolio
          </span>
          <button className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
            Upload Portfolio
          </button>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-20">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#070415]">Skills</h2>
            <button className="bg-[#070415] text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
              Add Skills
            </button>
          </div>

          <div className="flex gap-4">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className="w-14 h-14 rounded-full border border-gray-100 shadow-sm flex items-center justify-center p-3 hover:scale-105 transition-transform bg-white"
              >
                <div className="w-full h-full bg-gray-50 rounded-md" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#070415]">Request (12)</h2>
            <button className="bg-[#070415] text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
              Check Requests
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
