"use client";

import React from "react";
import Image from "next/image";
import freelancerImg from "../../../public/john-doe.png";
import traitsImg from "../../../public/traits.png";

const freelancersData = Array(12).fill({
  id: 1,
  name: "John Doe",
  role: "Designer",
  img: freelancerImg,
});

export const FreelancerList = () => {
  return (
    <section className="bg-white pb-20">
      <div className="px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {freelancersData.map((f, index) => (
          <div key={index} className="flex flex-col group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <Image
                src={f.img}
                alt={f.name}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
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
                  {f.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium mt-1">
                  {f.role}
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

      <div className="flex justify-center mt-16">
        <button className="bg-[#070415] text-white px-8 py-3 rounded-full font-bold text-[12px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-sm">
          Load More Freelancers
        </button>
      </div>
    </section>
  );
};
