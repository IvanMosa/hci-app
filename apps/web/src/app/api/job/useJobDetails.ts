import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { JobWithClient } from "@/components/ProjectList";

export const useJobDetails = (jobId: string | null) => {
  return useQuery({
    queryKey: ["job-details", jobId],
    queryFn: async () => {
      if (!jobId) return null;
      const response = await api.get<never, JobWithClient>(`/job/${jobId}`);
      return response;
    },
    enabled: !!jobId,
  });
};
