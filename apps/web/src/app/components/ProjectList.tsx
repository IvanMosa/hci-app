"use client";

import React from "react";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";

const projectsData = Array(12).fill({
  id: 1,
  title: "Website design + development",
  client: "RISK",
  price: "$1200",
  img: projectImg,
});

export const ProjectList = () => {
  return (
    <section className="bg-white pb-20">
      <div className="px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-10">
        {projectsData.map((p, index) => (
          <div key={index} className="flex flex-col group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <Image
                src={p.img}
                alt={p.title}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="flex justify-between items-center w-full text-white">
                  <span className="text-sm font-medium">View project</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-start w-full">
                <h3 className="text-[#070415] font-bold text-[15px] leading-tight max-w-[70%]">
                  {p.title}
                </h3>
                <span className="text-[#070415] font-bold text-[15px]">
                  {p.price}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-medium mt-1 uppercase tracking-wider">
                {p.client}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-[#070415] text-white px-10 py-4 rounded-full font-bold text-[12px] uppercase tracking-widest hover:bg-gray-800 transition-all">
          Load More Projects
        </button>
      </div>
    </section>
  );
};
