"use client";

import { useLogin } from "@/api/index";
import { useState } from "react";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-500"
      onSubmit={(e) => {
        e.preventDefault();
        login(loginData);
      }}
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
          name="email"
          type="text"
          value={loginData.email}
          placeholder="johndoe"
          onChange={handleChange}
          className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
            type="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-10 transition-all"
          />
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
        className="w-full flex justify-center bg-[#070415] hover:cursor-pointer text-white font-bold py-4 px-4 rounded-full tracking-wide hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-4"
      >
        LOG IN
      </button>
    </form>
  );
};
