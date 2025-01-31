import { useEffect, useErrorBoundary, useState } from "preact/hooks";
import { userCollections } from "../../collectionSignal";
import { CollectionSidebar } from "../components/CollectionSidebar";
import { getArticCollectionArtworks } from "../../api-calls/artic-api-calls";
import "../styles/collections.css";
import { ShowSidebarButton } from "../components/ShowSidebarButton";
import { getSmkCollectionArtworks } from "../../api-calls/smk-api-calls";
import { lazy, Suspense } from "preact/compat";
import { ArtworkCardSkeleton } from "../components/loading-states/ArtworkCardSkeleton";
import { ErrorMessage } from "../components/ErrorMessage";
const ArtworkList = lazy(() => import("../components/ArtworkList"));

export const Collections = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [artworksData, setArtworksData] = useState([]);
  const [error] = useErrorBoundary();

  const getArtworkIdsBySource = (source) =>
    userCollections.value[selectedCollection]?.artworks
      .filter((artwork) => artwork.source === source)
      .map((artwork) => artwork.id);

  useEffect(() => {
    const articArtwork = getArtworkIdsBySource("artic");
    const smkArtwork = getArtworkIdsBySource("smk");

    Promise.all([
      getArticCollectionArtworks(articArtwork),
      getSmkCollectionArtworks(smkArtwork),
    ]).then((results) => {
      const combinedData = results.flatMap((result) => result.data);
      setArtworksData(combinedData);
    });
  }, [selectedCollection]);

  return (
    <div class="collection">
      <CollectionSidebar
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        sidebarVisible={sidebarVisible}
      />
      <ShowSidebarButton
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      {error ? (
        <ErrorMessage />
      ) : userCollections.value[selectedCollection]?.artworks.length > 0 ? (
        <Suspense
          fallback={
            <ul aria-busy="true" className="artwork-collection-list">
              {Array(userCollections.value[selectedCollection]?.artworks.length)
                .fill(0)
                .map((_, index) => {
                  return <ArtworkCardSkeleton key={index} />;
                })}
            </ul>
          }
        >
          <ArtworkList
            artworks={artworksData}
            selectedCollection={selectedCollection}
            setArtworksData={setArtworksData}
            showButton={true}
          />
        </Suspense>
      ) : (
        <ArtworkList
          artworks={artworksData}
          selectedCollection={selectedCollection}
          setArtworksData={setArtworksData}
          showButton={true}
        />
      )}
    </div>
  );
};
