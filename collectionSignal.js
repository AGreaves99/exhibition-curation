import { signal } from "@preact/signals";

export const userCollections = signal([
  { name: "Test Collection 1", artworks: [] },
]);

export function newCollection(collectionName) {
  userCollections.value = [
    ...userCollections.value,
    { name: collectionName, artworks: [] },
  ];
}

export function addToCollection(collectionName, artworkId) {
  userCollections.value = userCollections.value.map((collection) => {
    if (collection.name === collectionName) {
      return {
        ...collection,
        artworks: [...collection.artworks, artworkId],
      };
    }
    return collection;
  });
}
