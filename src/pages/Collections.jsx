import { useEffect, useState } from "preact/hooks";
import { userCollections } from "../../collectionSignal";
import { CollectionSidebar } from "../components/CollectionSidebar";
import { getCollectionArtworks } from "../../api-calls/artic-api-calls";
import { ArtworkCard } from "../components/ArtworkCard";
import "../styles/collections.css";
import { RemoveButton } from "../components/RemoveButton";
import { ShowSidebarButton } from "../components/ShowSidebarButton";

export function Collections() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [artworksData, setArtworksData] = useState({
    data: [],
    iiifUrl: "",
  });

  useEffect(() => {
    getCollectionArtworks(
      userCollections.value[selectedCollection]?.artworks
    ).then((data) => {
      setArtworksData(data);
    });
  }, [selectedCollection]);

  const ArtworkCards = artworksData.data.map((artwork) => {
    return (
      <ArtworkCard
        key={artwork.id}
        id={artwork.id}
        title={artwork.title}
        artist={artwork.artistTitle}
        imageId={artwork.imageId}
        iiifUrl={artworksData.iiifUrl}
        altText={artwork.thumbnail?.alt_text || artwork.title}
      >
        <RemoveButton
          artworkId={artwork.id}
          collection={selectedCollection}
          setArtworksData={setArtworksData}
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
}
