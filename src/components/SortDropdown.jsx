import { useLocation } from "preact-iso";

export function SortArtworks() {
  const location = useLocation();
  const sorts = {
    "title-desc": "Title (A-Z)",
    "title-asc": "Title (Z-A)",
    "date-asc": "Date (newest)",
    "date-desc": "Date (oldest)",
  };

  function handleSortChange(event) {
    const sortValue = event.target.value;
    const params = new URLSearchParams(location.query);
    if (sortValue) {
      params.set("sort_by", sortValue);
    } else {
      params.delete("sort_by");
    }
    location.route("/?" + params.toString());
  }

  return (
    <div>
      <label for="sort-select">Sort By: </label>
      <select
        name="sort"
        id="sort-select"
        class="sort-select"
        onInput={handleSortChange}
        value={location.query.sort_by || ""}
      >
        <option value={""}>--Sort By--</option>
        {Object.keys(sorts).map((key) => (
          <option key={key} value={key}>
            {sorts[key][0].toUpperCase() + sorts[key].slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
