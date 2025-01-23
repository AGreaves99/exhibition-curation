import ArtworkCard from "./ArtworkCard";
import "../styles/artworkCard.css";
import { RemoveButton } from "./RemoveButton";

const ArtworkList = ({
  artworks = [],
  selectedCollection,
  setArtworksData,
  showButton = false,
}) => {
  return (
    <ul aria-busy="false" class="artwork-list">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          artist={artwork.artistTitle}
          hasImage={artwork.hasImage}
          iiifUrl={artwork.iiifUrl}
          altText={artwork.altText}
          source={artwork.source}
        >
          {showButton && (
            <RemoveButton
              collection={selectedCollection}
              setArtworksData={setArtworksData}
              uniqueId={artwork.uniqueId}
            />
          )}
        </ArtworkCard>
      ))}
    </ul>
  );
};

export default ArtworkList;
