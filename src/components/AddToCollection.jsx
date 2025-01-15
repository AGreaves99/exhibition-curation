import { useState } from "preact/hooks";
import { userCollections, addToCollection } from "../../collectionSignal";

export function AddToCollection({ artworkId }) {
  const [selectedCollection, setSelectedCollection] = useState("");

  const handleAddToCollection = () => {
    addToCollection(selectedCollection, artworkId);
    console.log(
      `Added artwork ${artworkId} to collection ${selectedCollection}`
    );
    console.log(userCollections.value);
  };

  return (
    <div class="add-to-collection-container">
      <label for="collection-select">Add to Collection:</label>
      <select
        id="collection-select"
        class="collection-select"
        value={selectedCollection}
        onInput={(event) => setSelectedCollection(event.target.value)}
      >
        <option value="" disabled>
          Select a collection
        </option>
        {userCollections.value.map((collection) => (
          <option key={collection.name} value={collection.name}>
            {collection.name}
          </option>
        ))}
      </select>
      <button
        class="add-to-collection-button"
        onClick={handleAddToCollection}
        disabled={!selectedCollection}
      >
        Add
      </button>
    </div>
  );
}
