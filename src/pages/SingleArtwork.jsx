import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { getSingleArtwork } from "../../api-calls/artic-api-calls";
import "../styles/singleArtwork.css";
import { AddToCollection } from "../components/AddToCollection";

export function SingleArtwork() {
  const { params } = useRoute();
  const [artworkData, setArtworkData] = useState({
    title: "",
    artist: "",
    imageId: "",
    iiifUrl: "",
    altText: "",
    dimensions: "",
    medium: "",
    shortDescription: "",
    dateStart: "",
    dateEnd: "",
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
          artworkData.imageId &&
          `${artworkData.iiifUrl}/${artworkData.imageId}/full/843,/0/default.jpg`
        }
        alt={artworkData.altText || artworkData.title}
      />
      <h1 class="single-artwork-title">{artworkData.title}</h1>
      <p class="single-artwork-description">
        Description: {artworkData.shortDescription}
      </p>
      <p class="single-artwork-artist">Artist: {artworkData.artist}</p>
      <p class="single-artwork-date">
        Date:{" "}
        {artworkData.dateStart === artworkData.dateEnd
          ? artworkData.dateStart
          : `${artworkData.dateStart} - ${artworkData.dateEnd}`}
      </p>
      <p class="single-artwork-dimensions">
        Dimensions: {artworkData.dimensions}
      </p>
      <p class="single-artwork-medium">Medium: {artworkData.medium}</p>
      <AddToCollection artworkId={params.id} />
    </div>
  );
}
