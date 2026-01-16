import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading explore...</div>}>
      <ExploreClient />
    </Suspense>
  );
}
