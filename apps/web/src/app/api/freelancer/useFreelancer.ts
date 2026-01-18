import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

export interface CombinedProfile extends FreelancerProfile {
  userDetails: {
    name: string;
    surname: string;
    email: string;
    dateOfBirth: string;
    type: string;
  };
}

export interface FreelancerProfile {
  id: string;
  bio: string | null;
  location: string | null;
  hourlyRate: number | null;
  portfolio: {
    id: string;
    title: string;
    description: string;
    url: string;
  }[];
  skills: {
    skill: { name: string };
  }[];
}

const getCombinedProfile = async (userId: string): Promise<CombinedProfile> => {
  const [userRes, profileRes] = await Promise.all([
    api.get(`/user/${userId}`),
    api.get(`/freelancer-profile/profile/${userId}`),
  ]);

  return {
    ...profileRes.data,
    userDetails: userRes,
  };
};

export const useFreelancer = (userId: string) => {
  return useQuery({
    queryKey: ["freelancer-combined", userId],
    queryFn: () => getCombinedProfile(userId),
    enabled: !!userId,
  });
};
