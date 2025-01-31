import { lazy, Suspense } from "preact/compat";
import "../styles/singleArtwork.css";
import { ArtworkDetailsSkeleton } from "../components/loading-states/ArtworkDetailsSkeleton";
import { useErrorBoundary } from "preact/hooks";
import { ErrorMessage } from "../components/ErrorMessage";
const SingleArtworkDetails = lazy(() =>
  import("../components/SingleArtworkDetails")
);

export const SingleArtwork = () => {
  const [error] = useErrorBoundary();
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <Suspense fallback={<ArtworkDetailsSkeleton />}>
      <SingleArtworkDetails />
    </Suspense>
  );
};
