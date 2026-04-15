"use client";

import { useState, useEffect } from "react";
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
  const searchParam = searchParams.get("search");

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

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParam]);

  const heading = view === "freelancers" ? "Explore Freelancers" : "Explore Projects";
  const subheading =
    view === "freelancers"
      ? "Browse freelancers and find the right talent for your project."
      : "Browse open projects and find work that matches your skills.";

  useEffect(() => {
    document.title = `${heading} | Freelancia`;
  }, [heading]);

  return (
    <>
      <header className="px-4 sm:px-8 md:px-10 lg:px-15 pt-8 pb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#070415]">
          {heading}
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">{subheading}</p>
      </header>

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
