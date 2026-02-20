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
  imageUrl: string | null;
  portfolio: {
    id: string;
    title: string;
    description: string;
    url: string;
    imageUrl: string | null;
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

  // profileRes is the response body: { data: profile }
  // After the axios interceptor (response.data), profileRes = { data: profile }
  const profileData = (profileRes as any)?.data ?? profileRes;

  return {
    ...profileData,
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
