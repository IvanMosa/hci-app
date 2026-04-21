import { api } from "@/api/index";
import { useMutation } from "@tanstack/react-query";
import { JwtResponse } from "@/api/index";
import { toast } from "react-toastify";

export type RegisterDataType = {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  type: "freelancer" | "client";
  password: string;
  confirmPassword: string;
};

const registerUser = (registerData: RegisterDataType) => {
  return api.post<RegisterDataType, JwtResponse>(
    "/auth/register",
    registerData,
  );
};

export const useRegister = (onSuccessCallback: (data: JwtResponse) => void) =>
  useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess: (data: JwtResponse) => {
      toast.success("You have successfully registered. You can now log in!");

      onSuccessCallback(data);
    },
  });
