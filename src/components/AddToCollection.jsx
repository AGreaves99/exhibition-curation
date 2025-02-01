import { useState } from "preact/hooks";
import { userCollections, addToCollection } from "../../collectionSignal";

export const AddToCollection = ({ artworkId, source }) => {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [show, setShow] = useState(false);

  const handleAddToCollection = () => {
    addToCollection(selectedCollection, source, artworkId);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const handleSelect = (event) => {
    setSelectedCollection(event.target.value);
    setShow(false);
  };

  return (
    <div class="add-to-collection-container">
      <label for="collection-select">Add to Collection:</label>
      <select
        id="collection-select"
        class="collection-select"
        value={selectedCollection}
        onInput={handleSelect}
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
      <p class={show ? "show" : "hide"}>
        Added art to collection {selectedCollection}
      </p>
    </div>
  );
};
