import "../styles/artworkCard.css";

const ArtworkCard = ({
  id,
  title,
  artist,
  hasImage,
  altText,
  iiifUrl,
  source,
  children,
}) => {
  const encodedId = encodeURIComponent(id);
  return (
    <li className="artwork-card">
      <a href={`/${source}/${encodedId}`} className="artwork-link">
        <img
          src={hasImage && iiifUrl}
          alt={altText}
          className="artwork-image"
        />
        <div className="artwork-details">
          <h1 className="artwork-title">{title}</h1>
          <p className="artwork-artist">{artist}</p>
        </div>
      </a>
      <div className="artwork-children">{children}</div>
    </li>
  );
};

export default ArtworkCard;
