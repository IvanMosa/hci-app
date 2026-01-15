"use client";

import { useLogin } from "@/api/index";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useLogin(() => {
    router.push("/");
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: loginData.username,
      password: loginData.password,
    });
  };

  return (
    <form
      className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-500"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label
          htmlFor="login-username"
          className="block text-sm font-bold text-zinc-700"
        >
          Username
        </label>
        <input
          id="login-username"
          name="username"
          type="text"
          value={loginData.username}
          onChange={handleChange}
          placeholder="johndoe"
          disabled={isPending}
          className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50"
        />
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
            value={loginData.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isPending}
            className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-10 transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
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
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 bg-[#070415] text-white font-bold py-4 px-4 rounded-full tracking-wide hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-4 disabled:bg-zinc-600"
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
