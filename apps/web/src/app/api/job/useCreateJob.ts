import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface CreateJobInput {
  title: string;
  description: string;
  category: string;
  budget: number;
  clientId: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

const createJob = async (data: CreateJobInput) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return api.post<CreateJobInput, any>("/job", data) as Promise<{ id: string }>;
};

export const useCreateJob = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    mutationKey: ["create-job"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
      queryClient.invalidateQueries({ queryKey: ["client-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["all-client-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["explore-jobs"] });

      toast.success("Project posted successfully!");

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;

      const errorMessage = Array.isArray(apiError?.response?.data?.message)
        ? apiError.response.data.message[0]
        : apiError?.response?.data?.message;

      toast.error(errorMessage || "Failed to post project");
    },
  });
};
