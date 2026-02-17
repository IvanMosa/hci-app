"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import projectImg from "../../../public/image 7.png";
import { useJobDetails } from "@/api/job/useJobDetails";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { ApplyModal } from "./ApplyModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ProjectDetailsModalProps {
  jobId: string | null;
  onClose: () => void;
}

export const ProjectDetailsModal = ({
  jobId,
  onClose,
}: ProjectDetailsModalProps) => {
  const { data: job, isLoading } = useJobDetails(jobId);
  const [applyOpen, setApplyOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const { data: profile } = useFreelancer(userId || "");

  const isLoggedIn = !!userId;
  const isFreelancer = profile?.userDetails?.type === "freelancer";
  const freelancerProfileId = profile?.id || null;

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      toast.info("Please sign in to apply for projects.");
      onClose();
      router.push("/login");
      return;
    }
    if (!isFreelancer) {
      toast.warning("Only freelancers can apply for projects.");
      return;
    }
    setApplyOpen(true);
  };

  if (!jobId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[1250px] relative shadow-2xl overflow-hidden min-h-[750px]">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-black z-20 cursor-pointer"
        >
          <X size={28} />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-[750px] font-bold">
            Loading...
          </div>
        ) : job ? (
          <div className="p-16 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-[32px] font-bold text-[#070415] tracking-tight">
                {job.title}
              </h2>
              <button
                onClick={handleApplyClick}
                className={`px-10 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  isLoggedIn && isFreelancer
                    ? "bg-[#070415] text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                }`}
              >
                {!isLoggedIn
                  ? "Sign In to Apply"
                  : !isFreelancer
                    ? "Freelancers Only"
                    : "Apply"}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-10">
              <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">
                RISK
              </div>
              <p className="text-[14px] font-bold text-[#070415]">
                {job.title}{" "}
                <span className="text-gray-400 font-normal ml-1">
                  By {job.client?.name} {job.client?.surname}
                </span>
              </p>
            </div>

            <div className="flex gap-16 items-stretch">
              <div
                className="relative flex-shrink-0 overflow-hidden shadow-sm"
                style={{
                  width: "755px",
                  height: "550px",
                  borderRadius: "11.72px",
                }}
              >
                <Image
                  src={projectImg}
                  alt={job.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col flex-1 justify-between py-2">
                <div>
                  <h3 className="text-[40px] font-bold text-[#070415] mb-8 leading-none">
                    From ${Number(job.budget).toLocaleString()}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-[15px] text-[#070415]">
                      <span className="font-bold">Concepts and revision:</span>{" "}
                      1 concept, 1 revision
                    </p>
                    <p className="text-[15px] text-[#070415]">
                      <span className="font-bold">Project duration:</span> 4
                      weeks
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <h4 className="text-[16px] font-bold text-[#070415]">
                    About project
                  </h4>
                  <p className="text-gray-500 text-[15px] leading-[1.6] max-w-[320px]">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>

            {applyOpen && freelancerProfileId && (
              <ApplyModal
                isOpen={applyOpen}
                onClose={() => setApplyOpen(false)}
                jobId={job.id}
                jobTitle={job.title}
                freelancerId={freelancerProfileId}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
