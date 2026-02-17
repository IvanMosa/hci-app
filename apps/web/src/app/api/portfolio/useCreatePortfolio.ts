import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreatePortfolioInput {
  freelancerId: string;
  title: string;
  description?: string;
  url?: string;
}

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePortfolioInput) => {
      const response = await api.post("/portfolio", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
    },
  });
};
