"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import defaultFreelancerImg from "../../../public/john-doe.png";
import portfolioImg from "../../../public/image 6.png";
import { FreelancerWithUser } from "@/api/freelancer/useAllFreelancers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FreelancerDetailsModalProps {
  freelancer: FreelancerWithUser | null;
  onClose: () => void;
}

export const FreelancerDetailsModal = ({
  freelancer,
  onClose,
}: FreelancerDetailsModalProps) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  if (!freelancer) return null;

  const handleDownloadPortfolio = () => {
    const portfolioItems = freelancer.portfolio || [];
    if (portfolioItems.length === 0) {
      toast.info("This freelancer hasn't added any portfolio items yet.");
      return;
    }

    const freelancerName = `${freelancer.user?.name} ${freelancer.user?.surname}`;
    let content = `Portfolio - ${freelancerName}\n`;
    content += `${"=".repeat(40)}\n\n`;

    if (freelancer.bio) {
      content += `Bio: ${freelancer.bio}\n\n`;
    }

    if (freelancer.skills?.length > 0) {
      content += `Skills: ${freelancer.skills.map((s) => s.skill.name).join(", ")}\n\n`;
    }

    content += `Portfolio Items:\n`;
    content += `${"-".repeat(30)}\n\n`;

    portfolioItems.forEach((item, index) => {
      content += `${index + 1}. ${item.title}\n`;
      if (item.description) content += `   Description: ${item.description}\n`;
      if (item.url) content += `   URL: ${item.url}\n`;
      content += `\n`;
    });

    content += `\nContact: ${freelancer.user?.email}\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-${freelancerName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Portfolio downloaded!");
  };

  const handleWorkWithFreelancer = () => {
    if (!userId) {
      toast.info("Please sign in to contact freelancers.");
      onClose();
      router.push("/login");
      return;
    }

    const freelancerName = `${freelancer.user?.name} ${freelancer.user?.surname}`;
    const email = freelancer.user?.email;
    const subject = encodeURIComponent(
      `Collaboration Opportunity - Freelancia`,
    );
    const body = encodeURIComponent(
      `Hi ${freelancer.user?.name},\n\nI found your profile on Freelancia and I'm interested in working with you.\n\nLooking forward to hearing from you!\n\nBest regards`,
    );

    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
    toast.success(`Opening email to ${freelancerName}...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[1250px] relative shadow-2xl overflow-hidden min-h-[750px] p-16">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-black z-20"
        >
          <X size={28} className="cursor-pointer" />
        </button>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                <Image
                  src={defaultFreelancerImg}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-baseline gap-4">
                <h2 className="text-[20px] font-bold text-[#070415] whitespace-nowrap">
                  {freelancer.user?.name} {freelancer.user?.surname}
                </h2>
                <span className="text-[#34A853] text-[14px] font-medium whitespace-nowrap">
                  Available for work
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <button
                onClick={handleDownloadPortfolio}
                className="text-[#070415] font-bold text-[14px] underline underline-offset-4 hover:text-gray-600 transition-all cursor-pointer"
              >
                Download my portfolio
              </button>
              <button
                onClick={handleWorkWithFreelancer}
                className="bg-[#070415] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all cursor-pointer"
              >
                Work with freelancer
              </button>
            </div>
          </div>

          {/* Portfolio showcase */}
          {freelancer.portfolio && freelancer.portfolio.length > 0 ? (
            <div className="space-y-6">
              <div
                className="relative w-full overflow-hidden shadow-sm self-center"
                style={{
                  height: "550px",
                  borderRadius: "11.72px",
                }}
              >
                <Image
                  src={portfolioImg}
                  alt="Portfolio work"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Portfolio items list */}
              {freelancer.portfolio.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-[16px] font-bold text-[#070415] mb-4">
                    Portfolio Items
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {freelancer.portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <h4 className="font-bold text-[#070415] text-sm">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-xs mt-2 inline-block hover:underline"
                          >
                            View project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative w-full overflow-hidden shadow-sm self-center"
              style={{
                height: "550px",
                borderRadius: "11.72px",
              }}
            >
              <Image
                src={portfolioImg}
                alt="Portfolio work"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
