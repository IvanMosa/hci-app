"use client";

import Link from "next/link";
import { Button } from "./Button";
import logo from "../../../public/freelancia.png";
import Image from "next/image";
import expand from "../../../public/expand_more.png";
import { useState, useEffect } from "react";
import { ExploreModal } from "./ExploreModal";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Stanje za userId
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId"); // Dohvaćanje userId-a

    setIsLoggedIn(!!token);
    setUserId(storedUserId);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("authChange", checkLoginStatus);
    return () => {
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId"); // Brišemo i userId pri logoutu
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  const navItemStyles =
    "font-semibold hover:underline underline-offset-8 decoration-2 transition-all duration-200";

  return (
    <nav className="text-black px-15 py-6 flex justify-between items-center bg-white">
      <Link href="/">
        <Image
          src={logo}
          alt="Freelancia Logo"
          width={150}
          height={40}
          priority
          className="mb-2"
        />
      </Link>

      <div className="space-x-8 text-[#070415] align-center flex items-center">
        <Link href="/" className={navItemStyles}>
          Home
        </Link>

        <div className="relative inline-flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-1 cursor-pointer ${navItemStyles}`}
          >
            <span>Explore</span>
            <Image
              src={expand}
              alt="Expand Icon"
              width={16}
              height={16}
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <ExploreModal open={open} onClose={() => setOpen(false)} />
        </div>

        {/* Dinamički link na profil: ako nema ID-a, šalje na login ili osnovni profile */}
        <Link
          href={userId ? `/profile/${userId}` : "/login"}
          className={navItemStyles}
        >
          Profile
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[#070415] text-white border rounded-[46px] px-8 py-4 text-[12px] font-bold hover:bg-gray-800 transition uppercase hover:cursor-pointer"
          >
            Log Out
          </button>
        ) : (
          <div className="pl-4">
            <Button content="log in / sign up" />
          </div>
        )}
      </div>
    </nav>
  );
};
