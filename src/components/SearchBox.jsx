import { useLocation } from "preact-iso";
import { useState } from "preact/hooks";

export function SearchBox() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSearch() {
    location.route("/?search=" + query);
  }

  return (
    <div>
      <label for="search">Search artworks: </label>
      <input
        id="search"
        type="text"
        value={query}
        onInput={handleChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
