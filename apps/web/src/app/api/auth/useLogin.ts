import { api } from "../index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type LoginType = {
  email?: string;
  username?: string;
  password: string;
};

export type JwtResponse = {
  accessToken: string;
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const loginUser = async (loginData: LoginType) => {
  return api.post<LoginType, JwtResponse>("/auth/login", loginData);
};

export const useLogin = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],
    onSuccess: (data: JwtResponse) => {
      localStorage.setItem("accessToken", data.accessToken);

      window.dispatchEvent(new Event("authChange"));

      toast.success("Successfully logged in!");

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError(error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError?.response?.data?.message || "Error logging in");
    },
  });
};
