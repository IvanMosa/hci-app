import { api } from "../index";
import { useInfiniteQuery } from "@tanstack/react-query";

export enum JobStatus {
  active = "active",
  completed = "completed",
}

export enum JobCategory {
  web_development = "web_development",
  design = "design",
  writing = "writing",
  marketing = "marketing",
  data_science = "data_science",
  other = "other",
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: JobCategory | null;
  budget: number;
  imageUrl: string | null;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  bio: string;
}

export const useClientJobs = (clientId: string) => {
  return useInfiniteQuery({
    queryKey: ["client-jobs", clientId],
    queryFn: async ({ pageParam = 0 }) => {
      const take = pageParam === 0 ? 4 : 8;

      const response = await api.get<never, Job[]>(`/job/client/${clientId}`, {
        params: {
          skip: pageParam,
          take: take,
        },
      });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentTake = allPages.length === 1 ? 4 : 8;
      if (lastPage?.length < currentTake) return undefined;

      return allPages.reduce((acc, page) => acc + page?.length, 0);
    },
    enabled: !!clientId,
  });
};
