"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "../components/Footer";
import { ExploreToolbar } from "../components/ExploreToolbar";
import { FreelancerList } from "../components/FreelancerList";
import { ProjectList } from "@/components/ProjectList";

export default function ExploreClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [view, setView] = useState<"projects" | "freelancers">("freelancers");
  const [searchQuery, setSearchQuery] = useState("");

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
      />

      {view === "freelancers" ? (
        <FreelancerList searchQuery={searchQuery} />
      ) : (
        <ProjectList searchQuery={searchQuery} />
      )}

      <Footer />
    </>
  );
}
