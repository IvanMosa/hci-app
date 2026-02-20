import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const uploadImage = async (
  endpoint: string,
  file: File,
): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("accessToken");

  const response = await axios.post(`${API_URL}${endpoint}`, formData, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return response.data;
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      return uploadImage(`/upload/profile-image/${userId}`, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
    },
  });
};

export const useUploadPortfolioImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      portfolioId,
      file,
    }: {
      portfolioId: string;
      file: File;
    }) => {
      return uploadImage(`/upload/portfolio-image/${portfolioId}`, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancer-combined"] });
    },
  });
};

export const useUploadJobImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, file }: { jobId: string; file: File }) => {
      return uploadImage(`/upload/job-image/${jobId}`, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["explore-jobs"] });
    },
  });
};
