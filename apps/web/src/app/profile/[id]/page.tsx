"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useFreelancer } from "@/api/freelancer/useFreelancer";
import { Footer } from "@/components/Footer";
import { ClientProfile } from "@/components/ClientProfile";
import { FreelancerProfile } from "@/components/FreelancerProfile";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: profile, isLoading, error } = useFreelancer(userId);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  if (error || !profile)
    return (
      <div className="text-red-500 text-center py-20 font-bold">
        Error loading profile.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {profile.userDetails?.type === "freelancer" ? (
        <FreelancerProfile profile={profile} />
      ) : (
        <ClientProfile profile={profile} />
      )}
      <Footer />
    </div>
  );
}
