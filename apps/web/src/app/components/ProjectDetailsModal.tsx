"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import projectImg from "../../../public/image 7.png";
import { useJobDetails } from "@/api/job/useJobDetails";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { useMyApplications } from "@/api/application/useMyApplications";
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

  const { data: myApplications } = useMyApplications(
    isFreelancer ? freelancerProfileId : null,
  );
  const hasExistingApplication = myApplications?.some(
    (app) => app.jobId === jobId,
  );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[1250px] relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-8 text-gray-400 hover:text-black z-20 cursor-pointer"
        >
          <X size={28} />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-[400px] sm:h-[750px] font-bold">
            Loading...
          </div>
        ) : job ? (
          <div className="p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col h-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-2">
              <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-[#070415] tracking-tight">
                {job.title}
              </h2>
              <button
                onClick={handleApplyClick}
                className="hidden md:block px-6 sm:px-10 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all cursor-pointer md:w-auto text-center flex-shrink-0 bg-[#070415] text-white hover:bg-gray-800"
              >
                {!isLoggedIn
                  ? "Sign In to Apply"
                  : !isFreelancer
                    ? "Freelancers Only"
                    : hasExistingApplication
                      ? "Update Application"
                      : "Apply"}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6 sm:mb-10">
              <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center text-[8px] text-white font-bold flex-shrink-0">
                RISK
              </div>
              <p className="text-[12px] sm:text-[14px] font-bold text-[#070415]">
                {job.title}{" "}
                <span className="text-gray-400 font-normal ml-1">
                  By {job.client?.name} {job.client?.surname}
                </span>
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-stretch">
              <div
                className="relative w-full lg:w-[55%] overflow-hidden shadow-sm flex-shrink-0"
                style={{
                  height: "clamp(200px, 45vw, 550px)",
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

              <div className="flex flex-col flex-1 justify-between py-2 gap-6">
                <div>
                  <h3 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#070415] mb-4 sm:mb-8 leading-none">
                    From ${Number(job.budget).toLocaleString()}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-[13px] sm:text-[15px] text-[#070415]">
                      <span className="font-bold">Concepts and revision:</span>{" "}
                      1 concept, 1 revision
                    </p>
                    <p className="text-[13px] sm:text-[15px] text-[#070415]">
                      <span className="font-bold">Project duration:</span> 4
                      weeks
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-5">
                  <h4 className="text-[14px] sm:text-[16px] font-bold text-[#070415]">
                    About project
                  </h4>
                  <p className="text-gray-500 text-[13px] sm:text-[15px] leading-[1.6] max-w-full lg:max-w-[320px]">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile sticky bottom button */}
            <div className="md:hidden sticky bottom-0 pt-4 pb-1 -mx-5 px-5 bg-white">
              <button
                onClick={handleApplyClick}
                className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all cursor-pointer bg-[#070415] text-white hover:bg-gray-800"
              >
                {!isLoggedIn
                  ? "Sign In to Apply"
                  : !isFreelancer
                    ? "Freelancers Only"
                    : hasExistingApplication
                      ? "Update Application"
                      : "Apply"}
              </button>
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
