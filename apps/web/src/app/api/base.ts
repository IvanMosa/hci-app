import axios from "axios";
import { AxiosError, AxiosResponse } from "axios";

type ErrorResponseType = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    message: string;
    error: string;
  }>;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const tokenItem = localStorage.getItem("accessToken");
  if (tokenItem) {
    const token = tokenItem;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error: ErrorResponseType) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/login";
      }
    }

    if (error.response)
      return Promise.reject(error.response.data.message || "An error occurred");

    return Promise.reject("Network error");
  },
);
