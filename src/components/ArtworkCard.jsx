import "../styles/artworkCard.css";

export function ArtworkCard({
  id,
  title,
  artist,
  imageId,
  altText,
  iiifUrl,
  children,
}) {
  return (
    <div className="artwork-card">
      <a href={`/artic/${id}`} className="artwork-link">
        <img
          src={imageId && `${iiifUrl}/${imageId}/full/400,/0/default.jpg`}
          alt={altText}
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
