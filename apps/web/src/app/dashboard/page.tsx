"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/projects");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="animate-spin" size={48} />
    </div>
  );
}
