"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/dashboard");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return <h2>Register Page</h2>;
};

export default RegisterPage;
