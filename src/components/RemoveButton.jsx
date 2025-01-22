import { removeFromCollection } from "../../collectionSignal";
import "../styles/removeButton.css";

export function RemoveButton({ collection, setArtworksData, uniqueId }) {
  function handleClick() {
    removeFromCollection(uniqueId, collection);
    setArtworksData((prevData) => {
      return prevData.filter((artwork) => artwork.uniqueId !== uniqueId);
    });
  }
  return (
    <button class="remove-button" onClick={handleClick}>
      Remove
    </button>
  );
}
