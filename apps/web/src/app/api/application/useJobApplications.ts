import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

export interface ApplicationWithFreelancer {
  id: string;
  jobId: string;
  freelancerId: string;
  proposal: string | null;
  bidAmount: number | null;
  createdAt: string;
  freelancer: {
    id: string;
    user: {
      name: string;
      surname: string;
      email: string;
    };
  };
}

export const useJobApplications = (jobId: string | null) => {
  return useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: async () => {
      if (!jobId) return [];
      const response = await api.get<never, ApplicationWithFreelancer[]>(
        `/application/job/${jobId}`,
      );
      return response;
    },
    enabled: !!jobId,
  });
};
