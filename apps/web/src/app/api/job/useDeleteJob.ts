import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const response = await api.delete(`/job/${jobId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-client-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["client-jobs"] });
    },
  });
};
