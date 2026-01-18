"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { Footer } from "@/components/Footer";
import projectImg from "../../../../public/image 4.png";
import Image from "next/image";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;

  const { data: profile, isLoading, error } = useFreelancer(userId);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-[#070415]" size={48} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-red-500 font-bold">
        Error loading profile data.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow w-full px-15 py-2">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#525fba] rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
            <div className="bg-white/20 w-8 h-8 rounded-sm flex items-center justify-center text-[10px]">
              LOGO
            </div>
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
                <p>{profile.location ? "Split, Croatia" : ""}</p>
                <p>{profile.userDetails?.email}</p>
                <p>+385 95 123 4567</p>
              </div>
            </div>
            <button className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
              Post New Project
            </button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-10 text-[#070415]">
            Posted Projects
          </h2>

          {/* Grid s preciznim gapom od 23px */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[23px]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col group cursor-pointer">
                {/* Slika s fiksnom visinom od 360px iz Figme */}
                <div className="relative h-[360px] w-full overflow-hidden rounded-xl mb-4">
                  <Image
                    src={projectImg}
                    alt="Project"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay efekt iz druge komponente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex justify-between items-center w-full text-white">
                      <span className="text-sm font-medium">View project</span>
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>

                {/* Info dio iz druge komponente */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-start w-full">
                    <h3 className="text-[#070415] font-bold text-[15px] leading-tight max-w-[70%]">
                      Website design + development
                    </h3>
                    <span className="text-[#070415] font-bold text-[15px]">
                      $1200
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-medium mt-1 uppercase tracking-wider">
                    RISK
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="bg-[#070415] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
              Load More Projects
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
