import { useLocation } from "preact-iso";
import { useState } from "preact/hooks";

export const SearchBox = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.query);
  const [query, setQuery] = useState(location.query.search || "");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query === "") {
      params.delete("search");
    } else {
      params.set("search", query);
    }
    params.delete("sort_by");
    params.delete("page");
    location.route("/?" + params.toString());
  };

  const handleKeyUp = (event) => {
    event.key === "Enter" && handleSearch()
  }

  return (
    <div class="searchbox-container">
      <label for="search">Search artworks: </label>
      <input
        id="search"
        class="searchbox"
        type="text"
        value={query}
        onInput={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Search..."
      />
      <button class="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
