"use client";

import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full lg:w-1/2 bg-white flex flex-col justify-start items-center p-8 pt-10 lg:p-16 lg:pt-24 z-0">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center items-center gap-4 mb-8 text-sm p-2 rounded-full w-fit mx-auto">
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 w-32 ${
              !isLogin
                ? "bg-[#070415] text-white shadow-md"
                : "text-zinc-500 hover:text-black bg-transparent"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 w-32 ${
              isLogin
                ? "bg-[#070415] text-white shadow-md"
                : "text-zinc-500 hover:text-black bg-transparent"
            }`}
          >
            Log In
          </button>
        </div>

        <div className="transition-all duration-500">
          {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
};
