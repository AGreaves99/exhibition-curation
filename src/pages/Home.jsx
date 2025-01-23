import { useEffect, useState } from "preact/hooks";
import { getArticArtworks } from "../../api-calls/artic-api-calls";
import { getSmkArtworks } from "../../api-calls/smk-api-calls";
import { ItemsPerPage } from "../components/ItemsPerPage";
import { SearchBox } from "../components/SearchBox";
import { SortArtworks } from "../components/SortDropdown";
import { useLocation } from "preact-iso";
import { Pagination } from "../components/Pagination";
import { SourceDropdown } from "../components/SourceDropdown";
import "../styles/artworkCard.css";
import { lazy, Suspense } from "preact/compat";
import { ArtworkCardSkeleton } from "../components/loading-states/ArtworkCardSkeleton";
const ArtworkList = lazy(() => import("../components/ArtworkList"));

export const Home = () => {
  const { limit, search, sort_by, page, source } = useLocation().query;
  const [artworksData, setArtworksData] = useState({
    data: [],
    totalPages: 0,
  });

  useEffect(() => {
    const fetchArtworks = source === "smk" ? getSmkArtworks : getArticArtworks;
    fetchArtworks(limit, search, sort_by, page).then((data) => {
      setArtworksData(data);
    });
  }, [useLocation().query]);

  return (
    <>
      <ItemsPerPage />
      <SourceDropdown />
      <SearchBox />
      <SortArtworks />
      <Suspense
        fallback={
          <ul aria-busy="true" class="artwork-list">
            {Array(Number(limit) || 10)
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
  );
};
