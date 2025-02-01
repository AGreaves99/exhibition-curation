import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { getSmkSingleArtwork } from "../../api-calls/smk-api-calls";
import { getArticSingleArtwork } from "../../api-calls/artic-api-calls";
import { AddToCollection } from "./AddToCollection";

const SingleArtworkDetails = () => {
  const { id, source } = useRoute().params;
  const decodedId = decodeURIComponent(id);
  const [artworkData, setArtworkData] = useState({
    title: "",
    artist: "",
    hasImage: false,
    iiifUrl: "",
    altText: "",
    dimensions: "",
    medium: "",
    shortDescription: "",
    dateStart: "",
    dateEnd: "",
  });

  useEffect(() => {
    const fetchArtwork =
      source === "smk" ? getSmkSingleArtwork : getArticSingleArtwork;
    fetchArtwork(decodedId).then((data) => {
      setArtworkData(data);
    });
  }, []);

  return (
    <div aria-busy="false" class="single-artwork-container">
      <img
        class="single-artwork-image"
        src={
          artworkData.hasImage &&
          `${artworkData.iiifUrl}/full/843,/0/default.jpg`
        }
        alt={artworkData.altText || artworkData.title}
      />
      <h1 class="single-artwork-title">{artworkData.title}</h1>
      {artworkData.shortDescription && (
        <p class="single-artwork-description">
          <span class="text-bold">Description:</span>{" "}
          {artworkData.shortDescription}
        </p>
      )}
      <p class="single-artwork-artist">Artist: {artworkData.artist}</p>
      <p class="single-artwork-date">
        <span class="text-bold">Date:</span>{" "}
        {artworkData.dateStart === artworkData.dateEnd
          ? artworkData.dateStart
          : `${artworkData.dateStart} - ${artworkData.dateEnd}`}
      </p>
      <p class="single-artwork-dimensions">
        <span class="text-bold">Dimensions:</span> {artworkData.dimensions}
      </p>
      <p class="single-artwork-medium">
        <span class="text-bold">Medium:</span> {artworkData.medium}
      </p>
      <AddToCollection artworkId={id} source={source} />
    </div>
  );
};

export default SingleArtworkDetails;
