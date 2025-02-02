import { useState } from "preact/hooks";
import { userCollections, newCollection } from "../../collectionSignal";
import "../styles/collectionSidebar.css";

export const CollectionSidebar = ({
  selectedCollection,
  setSelectedCollection,
  sidebarVisible,
}) => {
  const [newCollectionName, setNewCollectionName] = useState("");

  const addCollection = () => {
    newCollection(newCollectionName);
    setNewCollectionName("");
  };

  const handleChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const selectCollection = (event) => {
    setSelectedCollection(Number(event.target.value));
  };

  return (
    <div class={`collection-sidebar ${sidebarVisible ? "visible" : ""}`}>
      <h2 class="collection-title">Collections</h2>
      <label class="collection-label" for="collectionName">
        Create Collection:{" "}
      </label>
      <input
        type="text"
        id="collectionName"
        value={newCollectionName}
        onInput={handleChange}
        class="collection-input"
      />
      <button
        onClick={addCollection}
        disabled={!newCollectionName}
        class="collection-button"
      >
        Create
      </button>
      <div class="collection-list">
        {userCollections.value.map((collection, index) => {
          return (
            <button
              class={`collection-item ${
                index === selectedCollection ? "selected" : ""
              }`}
              key={collection.name}
              value={index}
              onClick={selectCollection}
            >
              {collection.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
