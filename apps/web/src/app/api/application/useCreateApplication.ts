import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface CreateApplicationInput {
  jobId: string;
  freelancerId: string;
  proposal?: string;
  bidAmount?: number;
}

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

const createApplication = async (data: CreateApplicationInput) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return api.post<CreateApplicationInput, any>("/application", data);
};

export const useCreateApplication = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    mutationKey: ["create-application"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });

      toast.success("Application submitted successfully!");

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;

      const errorMessage = Array.isArray(apiError?.response?.data?.message)
        ? apiError.response.data.message[0]
        : apiError?.response?.data?.message;

      toast.error(errorMessage || "Failed to submit application");
    },
  });
};
