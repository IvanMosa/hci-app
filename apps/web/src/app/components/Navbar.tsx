"use client";

import Link from "next/link";
import { Button } from "./Button";
import logo from "../../../public/freelancia.png";
import Image from "next/image";
import expand from "../../../public/expand_more.png";
import { useState, useEffect, useRef } from "react";
import { ExploreModal } from "./ExploreModal";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    window.dispatchEvent(new Event("authChange"));
    setMobileMenuOpen(false);
    router.push("/login");
  };

  const closeMobile = () => setMobileMenuOpen(false);

  const navItemStyles =
    "font-semibold hover:underline underline-offset-8 decoration-2 transition-all duration-200";

  const mobileNavItemStyles =
    "font-semibold text-lg py-3 border-b border-gray-100 w-full block transition-colors hover:text-gray-500";

  return (
    <>
      <nav className="text-black px-4 md:px-15 py-4 flex justify-between items-center bg-white h-[72px] fixed top-0 left-0 w-full z-50 shadow-sm">
        <Link href="/">
          <Image
            src={logo}
            alt="Freelancia Logo"
            width={150}
            height={40}
            priority
            className="mb-2 w-[110px] sm:w-[130px] md:w-[150px] h-auto"
          />
        </Link>

        {/* Hamburger button – visible on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-8 text-[#070415] items-center">
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
            <Link href="/dashboard" className={navItemStyles}>
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

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-[72px] right-0 h-[calc(100vh-72px)] w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col px-6 pt-6 pb-8 flex-1 overflow-y-auto">
          <Link href="/" className={mobileNavItemStyles} onClick={closeMobile}>
            Home
          </Link>

          <Link
            href="/explore?type=freelancers"
            className={mobileNavItemStyles}
            onClick={closeMobile}
          >
            Explore Freelancers
          </Link>

          <Link
            href="/explore?type=projects"
            className={mobileNavItemStyles}
            onClick={closeMobile}
          >
            Explore Projects
          </Link>

          {isLoggedIn && userType === "freelancer" && (
            <Link
              href="/dashboard"
              className={mobileNavItemStyles}
              onClick={closeMobile}
            >
              Dashboard
            </Link>
          )}

          {isLoggedIn && userType === "client" && (
            <Link
              href="/projects"
              className={mobileNavItemStyles}
              onClick={closeMobile}
            >
              Dashboard
            </Link>
          )}

          {isLoggedIn && (
            <Link
              href={userId ? `/profile/${userId}` : "/login"}
              className={mobileNavItemStyles}
              onClick={closeMobile}
            >
              Profile
            </Link>
          )}

          <div className="mt-6">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full bg-[#070415] text-white rounded-full py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition cursor-pointer"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={closeMobile}
                className="block w-full bg-[#070415] text-white rounded-full py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition text-center"
              >
                Log In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
