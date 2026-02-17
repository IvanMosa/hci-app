import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      jobId,
      status,
    }: {
      jobId: string;
      status: "active" | "completed";
    }) => {
      const response = await api.patch(`/job/${jobId}/status`, { status });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-client-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["client-jobs"] });
    },
  });
};
