import { ItemsPerPage } from "./ItemsPerPage";
import { SearchBox } from "./SearchBox";
import { SortArtworks } from "./SortDropdown";
import { SourceDropdown } from "./SourceDropdown";
import "../styles/searchContainer.css";

export const SearchContainer = () => {
  return (
    <div class="search-container">
      <ItemsPerPage />
      <SourceDropdown />
      <SearchBox />
      <SortArtworks />
    </div>
  );
};
