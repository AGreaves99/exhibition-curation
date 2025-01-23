import { removeFromCollection } from "../../collectionSignal";
import "../styles/removeButton.css";

export const RemoveButton = ({ collection, setArtworksData, uniqueId }) => {
  const handleClick = () => {
    removeFromCollection(uniqueId, collection);
    setArtworksData((prevData) => {
      return prevData.filter((artwork) => artwork.uniqueId !== uniqueId);
    });
  };
  return (
    <button class="remove-button" onClick={handleClick}>
      Remove
    </button>
  );
};
