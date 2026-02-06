import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

export interface ApplicationWithJob {
  id: string;
  jobId: string;
  freelancerId: string;
  proposal: string | null;
  bidAmount: number | null;
  createdAt: string;
  job: {
    id: string;
    title: string;
    description: string;
    budget: number | null;
    status: string;
    category: string | null;
    createdAt: string;
    client: {
      name: string;
      surname: string;
    };
  };
}

export const useMyApplications = (freelancerId: string | null) => {
  return useQuery({
    queryKey: ["my-applications", freelancerId],
    queryFn: async () => {
      if (!freelancerId) return [];
      const response = await api.get<never, ApplicationWithJob[]>(
        `/application/freelancer/${freelancerId}`,
      );
      return response;
    },
    enabled: !!freelancerId,
  });
};
