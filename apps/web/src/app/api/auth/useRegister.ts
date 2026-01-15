import { api } from "@/api/index";
import { useMutation } from "@tanstack/react-query";
import { JwtResponse } from "@/api/index";
import { toast } from "react-toastify";

export type RegisterDataType = {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  type: "FREELANCER" | "CLIENT";
  password: string;
  confirmPassword: string;
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const registerUser = (registerData: RegisterDataType) => {
  return api.post<RegisterDataType, JwtResponse>(
    "/auth/register",
    registerData
  );
};

export const useRegister = (onSuccessCallback: () => void) =>
  useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("You have successfully registered. You can now log in!");

      onSuccessCallback();
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.response?.data?.message || "Registration failed.");
    },
  });
