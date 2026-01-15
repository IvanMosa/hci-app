"use client";

import Link from "next/link";
import { Button } from "./Button";
import logo from "../../../public/freelancia.png";
import Image from "next/image";
import expand from "../../../public/expand_more.png";
import { useState } from "react";
import { ExploreModal } from "./ExploreModal";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="text-black px-15 py-6 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Image
          src={logo}
          alt="Freelancia Logo"
          width={150}
          height={40}
          priority
        />
      </div>

      <div className="space-x-6 text-[#070415]">
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
              src={expand}
              alt="Expand Icon"
              width={16}
              height={16}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

        <Button />
      </div>
    </nav>
  );
};
