"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../index";
import Image from "next/image";
import { ExploreModal } from "./ExploreModal";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
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

    window.dispatchEvent(new Event("authChange"));

    router.push("/login");
  };

  return (
    <nav className="text-black px-15 py-6 flex justify-between items-center">
      <Link href="/">
        <Image
          src="/freelancia.png"
          alt="Freelancia Logo"
          width={150}
          height={40}
          priority
          className="mb-2"
        />
      </Link>

      <div className="space-x-6 text-[#070415] align-center flex items-center">
        <Link
          href="/"
          className="hover:text-gray-500 transition-colors duration-200"
        >
          Home
        </Link>

        <div className="relative inline-flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-500"
          >
            <span>Explore</span>
            <Image
              src="/expand_more.png"
              alt="Expand Icon"
              width={16}
              height={16}
              className={`transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <ExploreModal open={open} />
        </div>
        <Link
          href="/dashboard"
          className="hover:text-gray-500 transition-colors duration-200"
        >
          Dashboard
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-[#070415] text-white border rounded-[46px] px-4 py-4 text-[12px] hover:bg-gray-800 transition uppercase hover:cursor-pointer"
          >
            Log Out
          </button>
        ) : (
          <Button content="log in / sign up" />
        )}
      </div>
    </nav>
  );
};
