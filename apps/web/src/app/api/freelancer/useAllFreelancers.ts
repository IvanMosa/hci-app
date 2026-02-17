import { api } from "../index";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface FreelancerWithUser {
  id: string;
  bio: string | null;
  location: string | null;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    type: string;
  };
  skills: {
    skill: { name: string };
  }[];
  portfolio?: {
    id: string;
    title: string;
    description: string | null;
    url: string | null;
  }[];
}

const getAllFreelancers = async ({
  pageParam = 0,
}): Promise<FreelancerWithUser[]> => {
  return await api.get(`/freelancer-profile`, {
    params: {
      skip: pageParam,
      take: 15,
    },
  });
};

export const useAllFreelancers = (search?: string) => {
  return useInfiniteQuery({
    queryKey: ["freelancers-list", search],
    queryFn: getAllFreelancers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 15) return undefined;
      return allPages.length * 15;
    },
  });
};
