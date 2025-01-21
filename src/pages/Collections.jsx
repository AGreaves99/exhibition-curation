import { useEffect, useState } from "preact/hooks";
import { userCollections } from "../../collectionSignal";
import { CollectionSidebar } from "../components/CollectionSidebar";
import { getArticCollectionArtworks } from "../../api-calls/artic-api-calls";
import { ArtworkCard } from "../components/ArtworkCard";
import "../styles/collections.css";
import { RemoveButton } from "../components/RemoveButton";
import { ShowSidebarButton } from "../components/ShowSidebarButton";

export function Collections() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [artworksData, setArtworksData] = useState([]);

  useEffect(() => {
    getArticCollectionArtworks(
      userCollections.value[selectedCollection]?.artworks
    ).then((data) => {
      setArtworksData(data.data);
    });
  }, [selectedCollection]);

  const ArtworkCards = artworksData.map((artwork) => {
    return (
      <ArtworkCard
        key={artwork.id}
        id={artwork.id}
        title={artwork.title}
        artist={artwork.artistTitle}
        hasImage={artwork.hasImage}
        iiifUrl={artwork.iiifUrl}
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
