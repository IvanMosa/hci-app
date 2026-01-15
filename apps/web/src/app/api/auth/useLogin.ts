import { api } from "../index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type LoginType = {
  email: string;
  password: string;
};

export type JwtResponse = {
  token: string;
};

const loginUser = async (loginData: LoginType) => {
  return api.post<LoginType, JwtResponse>("/auth/login", loginData);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],
    onSuccess: (data: JwtResponse) => {
      localStorage.setItem("jwt", data.token);
      toast.success("Successfully logged in!");
    },
    onError(error: string) {
      toast.error(`Error logging in: ${error}`);
    },
  });
};
