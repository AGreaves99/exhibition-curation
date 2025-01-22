import { useEffect, useState } from "preact/hooks";
import { userCollections } from "../../collectionSignal";
import { CollectionSidebar } from "../components/CollectionSidebar";
import { getArticCollectionArtworks } from "../../api-calls/artic-api-calls";
import ArtworkCard from "../components/ArtworkCard";
import "../styles/collections.css";
import { RemoveButton } from "../components/RemoveButton";
import { ShowSidebarButton } from "../components/ShowSidebarButton";
import { getSmkCollectionArtworks } from "../../api-calls/smk-api-calls";

export const Collections = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [artworksData, setArtworksData] = useState([]);

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

  const ArtworkCards = artworksData.map((artwork) => {
    return (
      <ArtworkCard
        key={artwork.uniqueId}
        id={artwork.id}
        title={artwork.title}
        artist={artwork.artistTitle}
        hasImage={artwork.hasImage}
        iiifUrl={artwork.iiifUrl}
        altText={artwork.altText}
        source={artwork.source}
      >
        <RemoveButton
          collection={selectedCollection}
          setArtworksData={setArtworksData}
          uniqueId={artwork.uniqueId}
        />
      </ArtworkCard>
    );
  });

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
      <ul class="artwork-collection-list"> {ArtworkCards} </ul>
    </div>
  );
};
