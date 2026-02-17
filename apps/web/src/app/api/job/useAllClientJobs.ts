import { api } from "../index";
import { useQuery } from "@tanstack/react-query";
import { Job } from "./useClientJobs";

export const useAllClientJobs = (clientId: string) => {
  return useQuery({
    queryKey: ["all-client-jobs", clientId],
    queryFn: async () => {
      const response = await api.get<never, Job[]>(`/job/client/${clientId}`, {
        params: {
          skip: 0,
          take: 10000,
        },
      });
      return response;
    },
    enabled: !!clientId,
  });
};
