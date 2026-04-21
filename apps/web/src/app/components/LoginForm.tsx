"use client";

import { useLogin } from "@/api/index";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ApiErrorShape {
  response?: { status?: number; data?: { message?: string | string[] } };
  message?: string;
}

const translateLoginError = (error: unknown): string => {
  const err = error as ApiErrorShape;
  const status = err?.response?.status;
  const raw = err?.response?.data?.message;
  const rawMessage = Array.isArray(raw) ? raw[0] : raw;

  if (status === 401 || /unauthor|invalid credentials|incorrect/i.test(rawMessage ?? "")) {
    return "Incorrect email or password. Please try again.";
  }
  if (status === 429) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (status && status >= 500) {
    return "Our servers are having trouble. Please try again shortly.";
  }
  if (rawMessage) return rawMessage;
  if (err?.message === "Network Error") {
    return "Can't reach the server. Check your internet connection.";
  }
  return "Something went wrong while signing you in. Please try again.";
};

export const LoginForm = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    mutate: login,
    isPending,
    error: loginError,
    isError,
    reset: resetLoginMutation,
  } = useLogin(() => {
    router.push("/");
  });

  const validateField = (name: string, value: string): string => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Enter a valid email address";
    }
    if (name === "password") {
      if (!value) return "Password is required";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (isError) resetLoginMutation();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const message = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      email: validateField("email", loginData.email),
      password: validateField("password", loginData.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    login({
      email: loginData.email.trim(),
      password: loginData.password,
    });
  };

  const hasFieldErrors = Object.values(errors).some(Boolean);
  const isEmpty = !loginData.email.trim() || !loginData.password;
  const submitDisabled = isPending || hasFieldErrors || isEmpty;

  return (
    <form
      className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-500"
      onSubmit={handleSubmit}
      noValidate
    >
      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{translateLoginError(loginError)}</span>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="block text-sm font-bold text-zinc-700"
        >
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={loginData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          disabled={isPending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 ${
            errors.email
              ? "border-red-400 focus:ring-red-400"
              : "border-zinc-300 focus:ring-black"
          }`}
        />
        {errors.email && (
          <p id="login-email-error" className="text-red-500 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="block text-sm font-bold text-zinc-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            disabled={isPending}
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent pr-10 transition-all disabled:opacity-50 ${
              errors.password
                ? "border-red-400 focus:ring-red-400"
                : "border-zinc-300 focus:ring-black"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p id="login-password-error" className="text-red-500 text-xs mt-1">
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <a
          href="#"
          className="text-sm text-[#070415] font-medium hover:text-black hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={submitDisabled}
        className="w-full flex justify-center items-center gap-2 bg-[#070415] text-white font-bold py-4 px-4 rounded-full tracking-wide hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-4 disabled:bg-zinc-600 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            LOGGING IN...
          </>
        ) : (
          "LOG IN"
        )}
      </button>
    </form>
  );
};
