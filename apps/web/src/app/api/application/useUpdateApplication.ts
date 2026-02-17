import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UpdateApplicationInput {
  applicationId: string;
  proposal?: string;
  bidAmount?: number;
}

export const useUpdateApplication = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, ...data }: UpdateApplicationInput) => {
      const response = await api.patch(`/application/${applicationId}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });

      toast.success("Application updated successfully!");

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: () => {
      toast.error("Failed to update application");
    },
  });
};
