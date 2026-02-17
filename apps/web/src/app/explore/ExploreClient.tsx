"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "../components/Footer";
import { ExploreToolbar } from "../components/ExploreToolbar";
import { FreelancerList } from "../components/FreelancerList";
import { ProjectList } from "@/components/ProjectList";

export interface ProjectFilters {
  status: string;
  minPrice: number;
  maxPrice: number;
  projectName: string;
  clientName: string;
}

export default function ExploreClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [view, setView] = useState<"projects" | "freelancers">("freelancers");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilters, setProjectFilters] = useState<ProjectFilters>({
    status: "all",
    minPrice: 0,
    maxPrice: 50000,
    projectName: "",
    clientName: "",
  });

  useEffect(() => {
    if (typeParam === "projects" || typeParam === "freelancers") {
      setView(typeParam);
    }
  }, [typeParam]);

  return (
    <>
      <ExploreToolbar
        view={view}
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        projectFilters={projectFilters}
        setProjectFilters={setProjectFilters}
      />

      {view === "freelancers" ? (
        <FreelancerList searchQuery={searchQuery} />
      ) : (
        <ProjectList searchQuery={searchQuery} filters={projectFilters} />
      )}

      <Footer />
    </>
  );
}
