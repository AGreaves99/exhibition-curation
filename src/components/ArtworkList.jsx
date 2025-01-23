import ArtworkCard from "./ArtworkCard";
import "../styles/artworkCard.css";

const ArtworkList = ({ artworks }) => {
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
          source={artwork.source}
        />
      ))}
    </ul>
  );
};

export default ArtworkList;
