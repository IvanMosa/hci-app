"use client";

import React, { useState } from "react";
import { User, Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRegister, RegisterDataType } from "@/api/index";
import { toast } from "react-toastify";

export const RegisterForm = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [registerData, setRegisterData] = useState<RegisterDataType>({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    type: "CLIENT",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: register, isPending } = useRegister(() => {
    setIsLogin(true);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleUserTypeChange = (type: "FREELANCER" | "CLIENT") => {
    setRegisterData((prev) => ({ ...prev, type: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!registerData.name.trim()) newErrors.name = "Name is required";
    if (!registerData.surname.trim()) newErrors.surname = "Surname is required";
    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!registerData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(registerData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
      } else if (age < 16) {
        newErrors.dateOfBirth = "You must be at least 16 years old";
      }
    }
    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    register({
      ...registerData,
      name: registerData.name.trim(),
      surname: registerData.surname.trim(),
      email: registerData.email.trim(),
    });
  };

  return (
    <form
      className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        <div className="w-1/2 space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-bold text-zinc-700"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            value={registerData.name}
            onChange={handleChange}
            placeholder="John"
            disabled={isPending}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 ${
              errors.name
                ? "border-red-400 focus:ring-red-400"
                : "border-zinc-300 focus:ring-black"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="w-1/2 space-y-2">
          <label
            htmlFor="surname"
            className="block text-sm font-bold text-zinc-700"
          >
            Surname
          </label>

          <input
            id="surname"
            type="text"
            value={registerData.surname}
            onChange={handleChange}
            placeholder="Doe"
            disabled={isPending}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 ${
              errors.surname
                ? "border-red-400 focus:ring-red-400"
                : "border-zinc-300 focus:ring-black"
            }`}
          />
          {errors.surname && (
            <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-bold text-zinc-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={registerData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          disabled={isPending}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 ${
            errors.email
              ? "border-red-400 focus:ring-red-400"
              : "border-zinc-300 focus:ring-black"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-bold text-zinc-700"
        >
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={registerData.dateOfBirth}
          onChange={handleChange}
          disabled={isPending}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all text-zinc-700 disabled:opacity-50 ${
            errors.dateOfBirth
              ? "border-red-400 focus:ring-red-400"
              : "border-zinc-300 focus:ring-black"
          }`}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-zinc-700 mb-1">
          I want to join as a...
        </label>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleUserTypeChange("FREELANCER")}
            disabled={isPending}
            className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${
              registerData.type === "FREELANCER"
                ? "border-black bg-zinc-50 text-black ring-1 ring-black"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <User size={20} className="mb-1" />

            <span className="text-xs font-bold">Freelancer</span>
          </button>

          <button
            type="button"
            onClick={() => handleUserTypeChange("CLIENT")}
            disabled={isPending}
            className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${
              registerData.type === "CLIENT"
                ? "border-black bg-zinc-50 text-black ring-1 ring-black"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Briefcase size={20} className="mb-1" />

            <span className="text-xs font-bold">Client</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-bold text-zinc-700"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={registerData.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isPending}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent pr-10 transition-all disabled:opacity-50 ${
              errors.password
                ? "border-red-400 focus:ring-red-400"
                : "border-zinc-300 focus:ring-black"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-bold text-zinc-700"
        >
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={registerData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={isPending}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50 ${
            errors.confirmPassword
              ? "border-red-400 focus:ring-red-400"
              : "border-zinc-300 focus:ring-black"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 bg-[#070415] text-white font-bold py-4 px-4 mt-10 rounded-full tracking-wide hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-zinc-600 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            SIGNING UP...
          </>
        ) : (
          "SIGN UP"
        )}
      </button>
    </form>
  );
};
