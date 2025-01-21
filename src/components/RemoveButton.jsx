import { removeFromCollection } from "../../collectionSignal";
import "../styles/removeButton.css";

export function RemoveButton({ artworkId, collection, setArtworksData }) {
  function handleClick() {
    removeFromCollection(artworkId, collection);
    setArtworksData((prevData) => {
      return prevData.filter((artwork) => artwork.id !== artworkId);
    });
  }
  return (
    <button class="remove-button" onClick={handleClick}>
      Remove
    </button>
  );
}
