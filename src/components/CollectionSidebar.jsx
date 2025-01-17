import { useState } from "preact/hooks";
import { userCollections, newCollection } from "../../collectionSignal";
import "../styles/collectionSidebar.css";

export function CollectionSidebar({
  selectedCollection,
  setSelectedCollection,
  sidebarVisible,
}) {
  const [newCollectionName, setNewCollectionName] = useState("");

  function addCollection() {
    newCollection(newCollectionName);
    setNewCollectionName("");
  }

  function handleChange(event) {
    setNewCollectionName(event.target.value);
  }

  function selectCollection(event) {
    setSelectedCollection(Number(event.target.value));
  }

  return (
    <div class={`collection-sidebar ${sidebarVisible ? "visible" : ""}`}>
      <h2 class="collection-title">Collections</h2>
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
        Create Collection
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
}
