import { useLocation } from "preact-iso";

export const ItemsPerPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.query);

  const handleChange = (event) => {
    const itemsPerPage = event.target.value;
    if (itemsPerPage === "10") {
      params.delete("limit");
    } else {
      params.set("limit", itemsPerPage);
    }
    location.route("/?" + params.toString());
  };
  return (
    <form class="dropdown-container">
      <label for="items-per-page">Items Per Page: </label>
      <select
        class="search-dropdown"
        id="items-per-page"
        value={location.query.limit || 10}
        onInput={handleChange}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={40}>40</option>
      </select>
    </form>
  );
};
