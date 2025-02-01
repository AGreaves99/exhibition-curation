import { useLocation } from "preact-iso";

export const SourceDropdown = () => {
  const location = useLocation();
  const sources = {
    artic: "Art Institute of Chicago",
    smk: "National Gallery of Denmark",
  };

  const handleSourceChange = (event) => {
    const sourceValue = event.target.value;
    const params = new URLSearchParams(location.query);
    if (sourceValue) {
      params.set("source", sourceValue);
    } else {
      params.delete("source");
    }
    location.route("/?" + params.toString());
  };

  return (
    <div class="dropdown-container">
      <label for="source-select">Source: </label>
      <select
        name="source"
        id="source-select"
        class="search-dropdown"
        onInput={handleSourceChange}
        value={location.query.source || "artic"}
      >
        {Object.keys(sources).map((key) => (
          <option key={key} value={key}>
            {sources[key]}
          </option>
        ))}
      </select>
    </div>
  );
};
