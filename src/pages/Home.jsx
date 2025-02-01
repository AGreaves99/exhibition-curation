import { useEffect, useErrorBoundary, useState } from "preact/hooks";
import { getArticArtworks } from "../../api-calls/artic-api-calls";
import { getSmkArtworks } from "../../api-calls/smk-api-calls";
import { useLocation } from "preact-iso";
import { Pagination } from "../components/Pagination";
import "../styles/artworkCard.css";
import { lazy, Suspense } from "preact/compat";
import { ArtworkCardSkeleton } from "../components/loading-states/ArtworkCardSkeleton";
import { ErrorMessage } from "../components/ErrorMessage";
import { SearchContainer } from "../components/SearchContainer";
const ArtworkList = lazy(() => import("../components/ArtworkList"));

export const Home = () => {
  const location = useLocation();
  const { limit = "10", search, sort_by, page, source } = location.query;
  const numLimit = Number(limit);
  const [artworksData, setArtworksData] = useState({
    data: [],
    totalPages: 0,
  });
  const [error] = useErrorBoundary();
  const [paramsError, setParamsError] = useState(false);

  useEffect(() => {
    const fetchArtworks = source === "smk" ? getSmkArtworks : getArticArtworks;
    fetchArtworks(limit, search, sort_by, page)
      .then((data) => {
        setArtworksData(data);
      })
      .catch((error) => {
        setParamsError(true);
        location.route("/");
      });
  }, [location]);

  return (
    <>
      <SearchContainer />
      {error || paramsError ? (
        <ErrorMessage />
      ) : (
        <>
          <Suspense
            fallback={
              <ul aria-busy="true" class="artwork-list">
                {Array(numLimit || 10)
                  .fill(0)
                  .map((_, index) => {
                    return <ArtworkCardSkeleton key={index} />;
                  })}
              </ul>
            }
          >
            <ArtworkList artworks={artworksData.data} />
          </Suspense>
          <Pagination totalPages={artworksData.totalPages} />
        </>
      )}
    </>
  );
};
