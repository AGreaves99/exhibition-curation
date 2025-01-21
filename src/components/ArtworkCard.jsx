import "../styles/artworkCard.css";

export function ArtworkCard({
  id,
  title,
  artist,
  hasImage,
  altText,
  iiifUrl,
  source = "artic",
  children,
}) {
  return (
    <div className="artwork-card">
      <a href={`/${source}/${id}`} className="artwork-link">
        <img
          src={hasImage && `${iiifUrl}/full/400,/0/default.jpg`}
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
