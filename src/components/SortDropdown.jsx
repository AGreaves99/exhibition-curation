import { useLocation } from "preact-iso";

export const SortArtworks = () => {
  const location = useLocation();
  const sorts = {
    "title-desc": "Title (A-Z)",
    "title-asc": "Title (Z-A)",
    "date-asc": "Date (newest)",
    "date-desc": "Date (oldest)",
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    const params = new URLSearchParams(location.query);
    if (sortValue) {
      params.set("sort_by", sortValue);
    } else {
      params.delete("sort_by");
    }
    location.route("/?" + params.toString());
  };

  return (
    <div class="dropdown-container">
      <label for="sort-select">Sort By: </label>
      <select
        name="sort"
        id="sort-select"
        class="search-dropdown"
        onInput={handleSortChange}
        value={location.query.sort_by || ""}
      >
        <option value={""}>Relevance</option>
        {Object.keys(sorts).map((key) => (
          <option key={key} value={key}>
            {sorts[key][0].toUpperCase() + sorts[key].slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
