import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

export interface ClientApplication {
  id: string;
  jobId: string;
  freelancerId: string;
  proposal: string | null;
  bidAmount: number | null;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  job: {
    id: string;
    title: string;
    budget: number | null;
    status: string;
  };
  freelancer: {
    id: string;
    user: {
      name: string;
      surname: string;
      email: string;
    };
  };
}

export const useClientApplications = (clientId: string) => {
  return useQuery({
    queryKey: ["client-applications", clientId],
    queryFn: async () => {
      const response = await api.get<never, ClientApplication[]>(
        `/application/client/${clientId}`,
      );
      return response;
    },
    enabled: !!clientId,
  });
};
