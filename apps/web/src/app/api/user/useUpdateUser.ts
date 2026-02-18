import { api } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserData;
    }) => {
      const response = await api.patch(`/user/${userId}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
    },
  });
};
