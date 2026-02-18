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
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");
    const storedUserType = localStorage.getItem("userType");

    setIsLoggedIn(!!token);
    setUserId(storedUserId);
    setUserType(storedUserType);
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
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  const navItemStyles =
    "font-semibold hover:underline underline-offset-8 decoration-2 transition-all duration-200";

  return (
    <nav className="text-black px-15 py-4 flex justify-between items-center bg-white h-[72px] fixed top-0 left-0 w-full z-50 shadow-sm">
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

        {isLoggedIn && userType === "freelancer" && (
          <Link href="/dashboard" className={navItemStyles}>
            Dashboard
          </Link>
        )}

        {isLoggedIn && userType === "client" && (
          <Link href="/projects" className={navItemStyles}>
            Dashboard
          </Link>
        )}

        {isLoggedIn && (
          <Link
            href={userId ? `/profile/${userId}` : "/login"}
            className={navItemStyles}
          >
            Profile
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[#070415] text-white border rounded-[46px] px-8 py-2 text-[12px] font-bold hover:bg-gray-800 transition uppercase hover:cursor-pointer"
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
