import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UpdatePortfolioInput {
  id: string;
  title?: string;
  description?: string;
  url?: string;
}

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdatePortfolioInput) => {
      const response = await api.patch(`/portfolio/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
      toast.success("Portfolio item updated!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const msg = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message[0]
        : error?.response?.data?.message || "Failed to update portfolio item";
      toast.error(msg);
    },
  });
};
