import "../styles/artworkCard.css";

export function ArtworkCard({ title, artist, image_id, alt_text, iiif_url }) {
  return (
    <div class="artwork-card">
      <img
        src={image_id && `${iiif_url}/${image_id}/full/400,/0/default.jpg`}
        alt={alt_text}
        class="artwork-image"
      />
      <div class="artwork-details">
        <h1 class="artwork-title">{title}</h1>
        <p class="artwork-artist">{artist}</p>
      </div>
    </div>
  );
}
