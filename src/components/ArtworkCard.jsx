import "../styles/artworkCard.css";

export function ArtworkCard({
  id,
  title,
  artist,
  image_id,
  alt_text,
  iiif_url,
  children,
}) {
  return (
    <div className="artwork-card">
      <a href={`/artic/${id}`} className="artwork-link">
        <img
          src={image_id && `${iiif_url}/${image_id}/full/400,/0/default.jpg`}
          alt={alt_text}
          className="artwork-image"
        />
        <div className="artwork-details">
          <h1 className="artwork-title">{title}</h1>
          <p className="artwork-artist">{artist}</p>
        </div>
      </a>
      <div className="artwork-children">{children}</div>
    </div>
  );
}
