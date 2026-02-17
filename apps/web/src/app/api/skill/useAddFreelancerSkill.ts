import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFreelancerSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      freelancerId,
      skillId,
    }: {
      freelancerId: string;
      skillId: string;
    }) => {
      const response = await api.post("/freelancer-skill", {
        freelancerId,
        skillId,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
    },
  });
};
