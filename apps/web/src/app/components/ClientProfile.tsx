"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Briefcase, FileText } from "lucide-react";
import johnDoeImg from "../../../public/john-doe.png";
import { useAllClientJobs } from "@/api/job/useAllClientJobs";
import { useClientApplications } from "@/api/application/useClientApplications";
import { EditProfileModal } from "./EditProfileModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ClientProfile = ({ profile }: { profile: any }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const clientId = profile.userDetails?.id;

  const { data: allJobs = [] } = useAllClientJobs(clientId);
  const { data: allApplications = [] } = useClientApplications(clientId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completedJobs = allJobs.filter((j: any) => j?.status === "completed");
  const acceptedApps = allApplications.filter((a) => a?.status === "accepted");

  return (
    <div className="w-full px-15 py-6">
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src={johnDoeImg}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#070415]">
            {profile.userDetails?.name} {profile.userDetails?.surname}
          </h1>
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Pencil size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start mb-16">
        <section>
          <h2 className="text-2xl font-bold mb-8 text-[#070415]">
            Personal Information
          </h2>
          <div className="text-gray-500 text-[15px] space-y-1 font-medium leading-relaxed">
            <p>{profile?.location || "Split, Croatia"}</p>
            <p>{profile.userDetails?.email}</p>
            <p>{profile.userDetails?.phone || "No phone number"}</p>
          </div>
        </section>

        <div className="flex gap-6">
          <div className="w-52 p-6 border border-gray-100 rounded-xl">
            <div className="flex items-center gap-3 mb-4 text-gray-400">
              <Briefcase size={22} />
              <span className="text-sm font-semibold text-[#070415]">
                Projects
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-[#070415]">
                  {allJobs.length}
                </span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Completed</span>
                <span className="text-lg font-bold text-green-600">
                  {completedJobs.length}
                </span>
              </div>
            </div>
          </div>

          <div className="w-52 p-6 border border-gray-100 rounded-xl">
            <div className="flex items-center gap-3 mb-4 text-gray-400">
              <FileText size={22} />
              <span className="text-sm font-semibold text-[#070415]">
                Applications
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-[#070415]">
                  {allApplications.length}
                </span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Accepted</span>
                <span className="text-lg font-bold text-green-600">
                  {acceptedApps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        type="client"
      />
    </div>
  );
};
