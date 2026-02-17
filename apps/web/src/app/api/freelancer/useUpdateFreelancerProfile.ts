import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateFreelancerData {
  bio?: string;
  location?: string;
  hourlyRate?: number;
}

export const useUpdateFreelancerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      profileId,
      data,
    }: {
      profileId: string;
      data: UpdateFreelancerData;
    }) => {
      const response = await api.patch(
        `/freelancer-profile/${profileId}`,
        data,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
    },
  });
};
