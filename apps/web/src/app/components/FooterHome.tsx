"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import socialMediaLogos from "../../../public/social-media-black.png";
import logoBlack from "../../../public/freelancia-black.png";

export const FooterHome = () => {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setStoredUserId(userId);
  }, []);

  return (
    <footer className="w-full bg-white text-[#070415] py-20 px-4 mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="relative">
          <Image
            src={logoBlack}
            alt="Freelancia Logo"
            width={180}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="space-y-4">
          <h3
            className="uppercase"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "19px",
              color: "#9ca3af",
              letterSpacing: "0px",
            }}
          >
            Sitemap
          </h3>
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a href="#" className="hover:text-gray-500 transition-colors">
              Home
            </a>
            <a
              href="/explore?type=projects"
              className="hover:text-gray-500 transition-colors"
            >
              Explore
            </a>
            <a
              href={`/profile/${storedUserId}`}
              className="hover:text-gray-500 transition-colors"
            >
              Profile
            </a>
          </nav>
        </div>

        <div className="py-2">
          <Image
            src={socialMediaLogos}
            alt="Social Media Logos"
            width={150}
            height={20}
            className="object-contain"
          />
        </div>

        <p className="text-xs text-gray-400 mt-8">© 2025 Freelancia</p>
      </div>
    </footer>
  );
};
