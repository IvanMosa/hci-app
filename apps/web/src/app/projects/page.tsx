"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { useClientJobs } from "@/api/job/useClientJobs";
import { useMyApplications } from "@/api/application/useMyApplications";
import { PostProjectModal } from "@/components/PostProjectModal";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import projectImg from "../../../public/image 4.png";

export default function ProjectsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
      return;
    }
    setUserId(storedUserId);
  }, [router]);

  if (!userId) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return <ProjectsContent userId={userId} />;
}

function ProjectsContent({ userId }: { userId: string }) {
  const { data: profile, isLoading } = useFreelancer(userId);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-red-500 text-center py-20 font-bold">
        Error loading profile.
      </div>
    );
  }

  const isClient = profile.userDetails?.type === "client";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {isClient ? (
        <ClientProjects userId={userId} />
      ) : (
        <FreelancerProjects profile={profile} />
      )}
      <Footer />
    </div>
  );
}

function ClientProjects({ userId }: { userId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useClientJobs(userId);

  const allJobs = data?.pages.flatMap((page) => page) || [];
  const filteredJobs =
    filter === "all"
      ? allJobs
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allJobs.filter((job: any) => job?.status === filter);

  return (
    <div className="w-full px-15 py-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#070415] mb-2">
            My Projects
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and track your posted projects
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
        >
          Post New Project
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        {(["all", "active", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              filter === status
                ? "bg-[#070415] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" size={40} />
        </div>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {filteredJobs.map((job: any) => (
            <div key={job?.id} className="flex flex-col group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4 h-[360px]">
                <Image
                  src={projectImg}
                  alt={job?.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                      job?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job?.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-[#070415] font-bold text-[15px]">
                    {job?.title}
                  </h3>
                  <p className="text-gray-400 text-[12px] mt-1">
                    {job?.category?.replace("_", " ")}
                  </p>
                </div>
                <span className="text-[#070415] font-bold text-[15px]">
                  ${Number(job?.budget).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-[#070415] text-white px-10 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-500 cursor-pointer"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <PostProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientId={userId}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FreelancerProjects({ profile }: { profile: any }) {
  const { data: applications, isLoading } = useMyApplications(profile?.id);

  return (
    <div className="w-full px-15 py-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#070415] mb-2">My Projects</h1>
        <p className="text-gray-500 text-sm">Projects you&apos;ve applied to</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" size={40} />
        </div>
      ) : !applications || applications.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          You haven&apos;t applied to any projects yet. Browse the{" "}
          <a href="/explore?type=projects" className="underline font-bold">
            explore page
          </a>{" "}
          to find opportunities.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {applications.map((app) => (
            <div key={app.id} className="flex flex-col group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4 h-[360px]">
                <Image
                  src={projectImg}
                  alt={app.job?.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                      app.job?.status === "active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {app.job?.status === "active" ? "Pending" : "Completed"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-[#070415] font-bold text-[15px]">
                    {app.job?.title}
                  </h3>
                  <p className="text-gray-400 text-[12px] mt-1 uppercase">
                    {app.job?.client?.name} {app.job?.client?.surname}
                  </p>
                </div>
                {app.bidAmount && (
                  <span className="text-[#070415] font-bold text-[15px]">
                    ${Number(app.bidAmount).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
