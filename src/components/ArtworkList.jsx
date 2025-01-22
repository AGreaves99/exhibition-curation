import { ArtworkCard } from "./ArtworkCard";
import "../styles/artworkCard.css";

const ArtworkList = ({ artworks, source }) => {
  return (
    <ul class="artwork-list">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          artist={artwork.artistTitle}
          hasImage={artwork.hasImage}
          iiifUrl={artwork.iiifUrl}
          altText={artwork.altText}
          source={source}
        />
      ))}
    </ul>
  );
};

export default ArtworkList;
