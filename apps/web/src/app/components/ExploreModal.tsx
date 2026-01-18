"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import peopleLogo from "../../../public/people_alt.png";
import folderLogo from "../../../public/folder.png";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ExploreModal = ({ open, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div
      ref={modalRef}
      className={`
        absolute left-0 top-full mt-2 w-44 rounded-xl bg-white shadow-lg z-50
        transition-all duration-200 ease-out border border-gray-100
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
    >
      <ul className="py-2 text-sm">
        <li className="hover:bg-gray-100 cursor-pointer" onClick={onClose}>
          <Link
            href="/explore?type=projects"
            className="flex items-center gap-2 px-4 py-2 w-full"
          >
            <Image
              src={folderLogo}
              alt="Projects Icon"
              width={16}
              height={16}
            />
            Projects
          </Link>
        </li>

        <li className="hover:bg-gray-100 cursor-pointer" onClick={onClose}>
          <Link
            href="/explore?type=freelancers"
            className="flex items-center gap-2 px-4 py-2 w-full"
          >
            <Image
              src={peopleLogo}
              alt="Freelancers Icon"
              width={16}
              height={16}
            />
            Freelancers
          </Link>
        </li>
      </ul>
    </div>
  );
};
