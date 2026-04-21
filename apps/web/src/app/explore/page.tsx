import { Suspense } from "react";
import type { Metadata } from "next";
import ExploreClient from "./ExploreClient";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading explore...</div>}>
      <ExploreClient />
    </Suspense>
  );
}
