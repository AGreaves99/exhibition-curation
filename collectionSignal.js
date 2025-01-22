import { signal } from "@preact/signals";

export const userCollections = signal([]);

export function newCollection(collectionName) {
  userCollections.value = [
    ...userCollections.value,
    { name: collectionName, artworks: [] },
  ];
}

export function addToCollection(collectionName, source, artworkId) {
  userCollections.value = userCollections.value.map((collection) => {
    if (collection.name === collectionName) {
      return {
        ...collection,
        artworks: [
          ...collection.artworks,
          {
            source,
            id: artworkId,
            uniqueId: `${source}-${artworkId}`,
          },
        ],
      };
    }
    return collection;
  });
}

export function removeFromCollection(uniqueId, collectionIndex) {
  userCollections.value = userCollections.value.map((collection, index) => {
    if (index === collectionIndex) {
      return {
        ...collection,
        artworks: collection.artworks.filter(
          (artwork) => artwork.uniqueId !== uniqueId
        ),
      };
    }
    return collection;
  });
}
