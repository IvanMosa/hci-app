"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ExploreToolbar } from "../components/ExploreToolbar";
import { FreelancerList } from "../components/FreelancerList";
import { ProjectList } from "@/components/ProjectList";

export default function ExploreClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [view, setView] = useState<"projects" | "freelancers">("freelancers");

  useEffect(() => {
    if (typeParam === "projects" || typeParam === "freelancers") {
      setView(typeParam);
    }
  }, [typeParam]);

  return (
    <>
      <ExploreToolbar view={view} setView={setView} />

      {view === "freelancers" ? <FreelancerList /> : <ProjectList />}

      <Footer />
    </>
  );
}
