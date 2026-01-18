import React from "react";
import Image from "next/image";
import socialMediaLogos from "../../../public/Frame 20.png";

export const Footer = () => {
  const storedUserId = localStorage.getItem("userId");
  return (
    <footer className="bg-[#070415] text-white py-20 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tight mt-20">freelancia</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
            Sitemap
          </h3>
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Explore
            </a>
            <a
              href={`/profile/${storedUserId}`}
              className="hover:text-zinc-300 transition-colors"
            >
              Profile
            </a>
          </nav>
        </div>

        <Image
          src={socialMediaLogos}
          alt="Social Media Logos"
          width={150}
          height={20}
        />

        <p className="text-xs text-zinc-500 mt-8">© 2025 Freelancia</p>
      </div>
    </footer>
  );
};
