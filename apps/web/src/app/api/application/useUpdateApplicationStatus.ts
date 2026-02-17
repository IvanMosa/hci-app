import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: "accepted" | "rejected";
    }) => {
      const response = await api.patch(`/application/${applicationId}/status`, {
        status,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
};
