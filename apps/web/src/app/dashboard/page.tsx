"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Briefcase, FileText, DollarSign, Clock } from "lucide-react";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { useMyApplications } from "@/api/application/useMyApplications";
import { useAllClientJobs } from "@/api/job/useAllClientJobs";
import { Footer } from "@/components/Footer";

export default function DashboardPage() {
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

  return <DashboardContent userId={userId} />;
}

function DashboardContent({ userId }: { userId: string }) {
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
      <div className="w-full px-15 py-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#070415] mb-2">
            Welcome back, {profile.userDetails?.name}!
          </h1>
          <p className="text-gray-500 text-sm">
            {isClient
              ? "Manage your projects and review applications"
              : "Track your applications and find new opportunities"}
          </p>
        </div>

        {isClient ? (
          <ClientDashboard userId={userId} />
        ) : (
          <FreelancerDashboard profile={profile} />
        )}
      </div>
      <Footer />
    </div>
  );
}

const PROJECTS_PER_PAGE = 4;

function ClientDashboard({ userId }: { userId: string }) {
  const { data: allJobs = [], isLoading } = useAllClientJobs(userId);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const activeJobs = allJobs.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (job: any) => job?.status === "active",
  );
  const completedJobs = allJobs.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (job: any) => job?.status === "completed",
  );
  const totalBudget = allJobs.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, job: any) => sum + Number(job?.budget || 0),
    0,
  );

  const visibleJobs = allJobs.slice(0, visibleCount);
  const hasMore = visibleCount < allJobs.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<Briefcase size={24} />}
          label="Total Projects"
          value={allJobs.length.toString()}
        />
        <StatCard
          icon={<Clock size={24} />}
          label="Active Projects"
          value={activeJobs.length.toString()}
        />
        <StatCard
          icon={<FileText size={24} />}
          label="Completed"
          value={completedJobs.length.toString()}
        />
        <StatCard
          icon={<DollarSign size={24} />}
          label="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
        />
      </div>

      <section>
        <h2 className="text-xl font-bold text-[#070415] mb-6">Your Projects</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : allJobs.length === 0 ? (
          <p className="text-gray-500">
            You haven&apos;t posted any projects yet.
          </p>
        ) : (
          <div className="h-[495px] overflow-y-auto pr-2">
            <div className="space-y-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {visibleJobs.map((job: any) => (
                <div
                  key={job?.id}
                  className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-sm transition-all"
                >
                  <div>
                    <h3 className="font-bold text-[#070415] text-[15px]">
                      {job?.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {job?.category?.replace("_", " ")} •{" "}
                      {new Date(job?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[#070415] font-bold">
                      ${Number(job?.budget).toLocaleString()}
                    </span>
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
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-4 pb-2">
                <button
                  onClick={() =>
                    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE)
                  }
                  className="px-6 py-2 bg-[#070415] text-white text-sm font-semibold rounded-lg hover:bg-[#1a1430] transition-colors cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FreelancerDashboard({ profile }: { profile: any }) {
  const { data: applications, isLoading } = useMyApplications(profile?.id);

  const pendingApps = applications?.filter(
    (app) => app.job?.status === "active",
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<FileText size={24} />}
          label="Applications"
          value={(applications?.length || 0).toString()}
        />
        <StatCard
          icon={<Clock size={24} />}
          label="Pending"
          value={(pendingApps?.length || 0).toString()}
        />
        <StatCard
          icon={<Briefcase size={24} />}
          label="Skills"
          value={(profile?.skills?.length || 0).toString()}
        />
        <StatCard
          icon={<DollarSign size={24} />}
          label="Hourly Rate"
          value={profile?.hourlyRate ? `$${profile.hourlyRate}/hr` : "Not set"}
        />
      </div>

      <section>
        <h2 className="text-xl font-bold text-[#070415] mb-6">
          My Applications
        </h2>
        {isLoading ? (
          <p className="text-gray-500">Loading applications...</p>
        ) : !applications || applications.length === 0 ? (
          <p className="text-gray-500">
            You haven&apos;t applied to any projects yet.
          </p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-bold text-[#070415] text-[15px]">
                    {app.job?.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    By {app.job?.client?.name} {app.job?.client?.surname} •{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {app.bidAmount && (
                    <span className="text-[#070415] font-bold">
                      ${Number(app.bidAmount).toLocaleString()}
                    </span>
                  )}
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
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-6 border border-gray-100 rounded-xl">
      <div className="flex items-center gap-3 mb-3 text-gray-400">{icon}</div>
      <p className="text-2xl font-bold text-[#070415]">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
