import { api } from "../index";
import { useMutation } from "@tanstack/react-query";

type LoginType = {
  email?: string;
  username?: string;
  password: string;
};

export type JwtResponse = {
  accessToken: string;
  userId: string;
  userType?: string;
};

const loginUser = async (loginData: LoginType) => {
  return api.post<LoginType, JwtResponse>("/auth/login", loginData);
};

export const useLogin = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],
    onSuccess: (data: JwtResponse) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      if (data.userType) {
        localStorage.setItem("userType", data.userType);
      }

      window.dispatchEvent(new Event("authChange"));

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
