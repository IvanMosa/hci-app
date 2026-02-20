"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Trash2,
  CheckCircle,
  Briefcase,
  FileText,
  DollarSign,
  Clock,
  Pencil,
  Check as CheckIcon,
} from "lucide-react";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { useAllClientJobs } from "@/api/job/useAllClientJobs";
import { useUpdateJobStatus } from "@/api/job/useUpdateJobStatus";
import { useDeleteJob } from "@/api/job/useDeleteJob";
import { useMyApplications } from "@/api/application/useMyApplications";
import { useJobApplications } from "@/api/application/useJobApplications";
import { useUpdateApplicationStatus } from "@/api/application/useUpdateApplicationStatus";
import { useUpdateFreelancerProfile } from "@/api/freelancer/useUpdateFreelancerProfile";
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
      <div className="w-full px-4 sm:px-8 md:px-10 lg:px-15 py-6">
        <div className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#070415] mb-2">
            Welcome back, {profile.userDetails?.name}!
          </h1>
          <p className="text-gray-500 text-sm">
            {isClient
              ? "Manage your projects and review applications"
              : "Track your applications and find new opportunities"}
          </p>
        </div>
      </div>
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [screenWidth, setScreenWidth] = useState(1200);
  const { data: allJobs = [], isLoading } = useAllClientJobs(userId);
  const filteredJobs =
    filter === "all"
      ? allJobs
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allJobs.filter((job: any) => job?.status === filter);

  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJobId) {
      setSelectedJobId(filteredJobs[0]?.id);
    }
  }, [filteredJobs, selectedJobId]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedJob = allJobs.find((j: any) => j?.id === selectedJobId);

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

  const visibleCards =
    screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : screenWidth < 1280 ? 3 : 5;
  const maxIndex = Math.max(0, filteredJobs.length - visibleCards);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  // Reset index and select first job when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    if (filteredJobs.length > 0) {
      setSelectedJobId(filteredJobs[0]?.id);
    } else {
      setSelectedJobId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="w-full px-4 sm:px-8 md:px-10 lg:px-15 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
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

      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex gap-3">
          {(["all", "active", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                filter === status
                  ? "bg-[#070415] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#070415] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
        >
          Post New Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" size={40} />
        </div>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No projects found.</p>
      ) : (
        <div
          className={`flex items-center ${filteredJobs.length > visibleCards ? "sm:-mx-12" : ""}`}
        >
          {filteredJobs.length > visibleCards && (
            <button
              onClick={prevSlide}
              className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer shrink-0 hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
            </button>
          )}

          <div
            className={`flex-1 py-4 ${
              filteredJobs.length > visibleCards
                ? "overflow-x-clip overflow-y-visible -mx-5 px-5"
                : "overflow-visible"
            }`}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {filteredJobs.map((job: any) => (
                <div
                  key={job?.id}
                  className={`flex flex-col group cursor-pointer transition-all duration-300 ${
                    selectedJobId === job?.id
                      ? "scale-[1.03] opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    minWidth: `calc((100% - ${(visibleCards - 1) * 24}px) / ${visibleCards})`,
                  }}
                  onClick={() => setSelectedJobId(job?.id)}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl mb-4 h-[200px] sm:h-[280px] transition-shadow duration-300 ${
                      selectedJobId === job?.id
                        ? "shadow-[0_4px_15px_rgba(7,4,21,0.15)]"
                        : ""
                    }`}
                  >
                    <Image
                      src={job?.imageUrl || projectImg}
                      alt={job?.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={!!job?.imageUrl}
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
          </div>

          {filteredJobs.length > visibleCards && (
            <button
              onClick={nextSlide}
              className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer shrink-0 hidden sm:block"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
            </button>
          )}
        </div>
      )}

      {allJobs.length > 0 ? (
        <ProjectApplicationsSection
          jobId={selectedJobId}
          jobTitle={selectedJob?.title}
          jobStatus={selectedJob?.status}
          onDeselectJob={() => setSelectedJobId(null)}
        />
      ) : (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-[#070415] mb-6">
            Applications
          </h2>
          <p className="text-gray-500">No projects yet.</p>
        </section>
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
  const { mutate: updateProfile, isPending: isUpdatingRate } =
    useUpdateFreelancerProfile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200);
  const [rateValue, setRateValue] = useState(
    profile?.hourlyRate ? String(profile.hourlyRate) : "",
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pendingApps = applications?.filter((app) => app.status === "pending");
  const acceptedApps = applications?.filter((app) => app.status === "accepted");

  const handleSaveRate = () => {
    if (!profile?.id) return;
    updateProfile(
      {
        profileId: profile.id,
        data: { hourlyRate: rateValue ? Number(rateValue) : undefined },
      },
      {
        onSuccess: () => setIsEditingRate(false),
      },
    );
  };

  const visibleCards =
    screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : screenWidth < 1280 ? 3 : 5;
  const maxIndex = Math.max(0, (applications?.length || 0) - visibleCards);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-10 lg:px-15 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
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
          label="Accepted"
          value={(acceptedApps?.length || 0).toString()}
        />
        <div className="p-6 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-3 text-gray-400">
            <DollarSign size={24} />
          </div>
          {isEditingRate ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <span className="pl-3 text-gray-400 text-lg font-bold">$</span>
                <input
                  type="number"
                  value={rateValue}
                  onChange={(e) => setRateValue(e.target.value)}
                  className="w-20 px-2 py-1.5 text-lg font-bold text-[#070415] focus:outline-none"
                  autoFocus
                  min={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveRate();
                    if (e.key === "Escape") setIsEditingRate(false);
                  }}
                />
                <span className="pr-3 text-gray-400 text-sm">/hr</span>
              </div>
              <button
                onClick={handleSaveRate}
                disabled={isUpdatingRate}
                className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                <CheckIcon size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-[#070415]">
                {profile?.hourlyRate ? `$${profile.hourlyRate}/hr` : "Not set"}
              </p>
              <button
                onClick={() => setIsEditingRate(true)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <Pencil size={14} className="text-gray-400" />
              </button>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">Hourly Rate</p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#070415] mb-2">
          My Applications
        </h2>
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
        <div
          className={`flex items-center ${applications.length > visibleCards ? "sm:-mx-12" : ""}`}
        >
          {applications.length > visibleCards && (
            <button
              onClick={prevSlide}
              className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer shrink-0 hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
            </button>
          )}

          <div
            className={`flex-1 py-4 ${
              applications.length > visibleCards
                ? "overflow-x-clip overflow-y-visible -mx-5 px-5"
                : "overflow-visible"
            }`}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col group cursor-pointer"
                  style={{
                    minWidth: `calc((100% - ${(visibleCards - 1) * 24}px) / ${visibleCards})`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl mb-4 h-[200px] sm:h-[280px]">
                    <Image
                      src={projectImg}
                      alt={app.job?.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                          app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : app.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status === "accepted"
                          ? "Accepted"
                          : app.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
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
          </div>

          {applications.length > visibleCards && (
            <button
              onClick={nextSlide}
              className="text-[#070415] p-2 hover:opacity-70 transition cursor-pointer shrink-0 hidden sm:block"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectApplicationsSection({
  jobId,
  jobTitle,
  jobStatus,
  onDeselectJob,
}: {
  jobId: string | null;
  jobTitle?: string;
  jobStatus?: string;
  onDeselectJob: () => void;
}) {
  const { data: applications, isLoading } = useJobApplications(jobId);
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();
  const { mutate: updateJobStatus, isPending: isUpdatingJob } =
    useUpdateJobStatus();
  const { mutate: deleteJob, isPending: isDeletingJob } = useDeleteJob();

  const handleStatusChange = (
    applicationId: string,
    status: "accepted" | "rejected",
  ) => {
    updateStatus({ applicationId, status });
  };

  const handleCompleteProject = () => {
    if (!jobId) return;
    updateJobStatus({ jobId, status: "completed" });
  };

  const handleReactivateProject = () => {
    if (!jobId) return;
    updateJobStatus({ jobId, status: "active" });
  };

  const handleDeleteProject = () => {
    if (!jobId) return;
    if (!confirm("Are you sure you want to delete this project?")) return;
    deleteJob(jobId, {
      onSuccess: () => onDeselectJob(),
    });
  };

  return (
    <section className="mt-10 sm:mt-16 transition-all duration-500 ease-in-out">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#070415]">
          Applications on {jobTitle || "..."}
        </h2>
        {jobId && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {jobStatus === "active" && (
              <button
                onClick={handleCompleteProject}
                disabled={isUpdatingJob}
                className="flex items-center gap-1.5 px-5 py-2 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle size={14} strokeWidth={2.5} />
                Mark Completed
              </button>
            )}
            {jobStatus === "completed" && (
              <button
                onClick={handleReactivateProject}
                disabled={isUpdatingJob}
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle size={14} strokeWidth={2.5} />
                Reactivate
              </button>
            )}
            <button
              onClick={handleDeleteProject}
              disabled={isDeletingJob}
              className="flex items-center gap-1.5 px-5 py-2 bg-white text-red-600 text-xs font-bold uppercase tracking-wider rounded-full border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 size={14} strokeWidth={2.5} />
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="transition-all duration-500 ease-in-out overflow-hidden">
        {isLoading ? (
          <p className="text-gray-500">Loading applications...</p>
        ) : !applications || applications.length === 0 ? (
          <p className="text-gray-500">No applications for this project yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border rounded-xl transition-all duration-300 gap-4 ${
                  app.status === "accepted"
                    ? "border-green-200 bg-green-50/50"
                    : app.status === "rejected"
                      ? "border-red-200 bg-red-50/30 opacity-60"
                      : "border-gray-100 hover:shadow-sm"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-[#070415] text-[15px]">
                      {app.freelancer?.user?.name}{" "}
                      {app.freelancer?.user?.surname}
                    </h3>
                    {app.status !== "pending" && (
                      <span
                        className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                          app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {app.freelancer?.user?.email} •{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                  {app.proposal && (
                    <p className="text-gray-500 text-sm mt-2 max-w-xl line-clamp-2">
                      {app.proposal}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {app.bidAmount && (
                    <span className="text-[#070415] font-bold text-[15px]">
                      ${Number(app.bidAmount).toLocaleString()}
                    </span>
                  )}
                  {app.status === "pending" && (
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        onClick={() => handleStatusChange(app.id, "accepted")}
                        disabled={isPending}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Check size={14} strokeWidth={2.5} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(app.id, "rejected")}
                        disabled={isPending}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-red-600 text-xs font-bold uppercase tracking-wider rounded-full border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <X size={14} strokeWidth={2.5} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
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
