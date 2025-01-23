import { lazy, Suspense } from "preact/compat";
import "../styles/singleArtwork.css";
const SingleArtworkDetails = lazy(() =>
  import("../components/SingleArtworkDetails")
);

export const SingleArtwork = () => {
  return (
    <Suspense fallback={<p>Loading artwork</p>}>
      <SingleArtworkDetails />
    </Suspense>
  );
};
