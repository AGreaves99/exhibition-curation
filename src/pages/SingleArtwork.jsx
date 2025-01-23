import { lazy, Suspense } from "preact/compat";
import "../styles/singleArtwork.css";
import { ArtworkDetailsSkeleton } from "../components/loading-states/ArtworkDetailsSkeleton";
const SingleArtworkDetails = lazy(() =>
  import("../components/SingleArtworkDetails")
);

export const SingleArtwork = () => {
  return (
    <Suspense fallback={<ArtworkDetailsSkeleton />}>
      <SingleArtworkDetails />
    </Suspense>
  );
};
