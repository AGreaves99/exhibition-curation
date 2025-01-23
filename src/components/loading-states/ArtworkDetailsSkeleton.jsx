import "../../styles/artworkDetailsSkeleton.css";

export const ArtworkDetailsSkeleton = () => (
  <div aria-busy="true" class="artwork-details-skeleton">
    <img class="skeleton-details-image"></img>
    <h1 class="skeleton-details-title"></h1>
    <p class="skeleton-details-description"></p>
    <p class="skeleton-details-artist"></p>
    <p class="skeleton-details-date"></p>
    <p class="skeleton-details-dimensions"></p>
    <p class="skeleton-details-medium"></p>
  </div>
);
