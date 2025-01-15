import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { getSingleArtwork } from "../../api-calls/api-calls";
import "../styles/singleArtwork.css";

export function SingleArtwork() {
  const { params } = useRoute();
  const [artworkData, setArtworkData] = useState({
    title: "",
    artist: "",
    image_id: "",
    iiif_url: "",
    alt_text: "",
    dimensions: "",
    medium: "",
    short_description: "",
    date_start: "",
    date_end: "",
  });

  useEffect(() => {
    getSingleArtwork(params.id).then((data) => {
      setArtworkData(data);
    });
  }, []);

  return (
    <div class="single-artwork-container">
      <img
        class="single-artwork-image"
        src={
          artworkData.image_id &&
          `${artworkData.iiif_url}/${artworkData.image_id}/full/843,/0/default.jpg`
        }
        alt={artworkData.alt_text || artworkData.title}
      />
      <h1 class="single-artwork-title">{artworkData.title}</h1>
      <p class="single-artwork-description">
        Description: {artworkData.short_description}
      </p>
      <p class="single-artwork-artist">Artist: {artworkData.artist}</p>
      <p class="single-artwork-date">
        Date:{" "}
        {artworkData.date_start === artworkData.date_end
          ? artworkData.date_start
          : `${artworkData.date_start} - ${artworkData.date_end}`}
      </p>
      <p class="single-artwork-dimensions">
        Dimensions: {artworkData.dimensions}
      </p>
      <p class="single-artwork-medium">Medium: {artworkData.medium}</p>
    </div>
  );
}
