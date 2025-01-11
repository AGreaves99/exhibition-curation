import { useLocation } from "preact-iso";

export function ItemsPerPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.query);
  function handleChange(event) {
    const itemsPerPage = event.target.value;
    if (itemsPerPage === "10") {
      params.delete("limit");
    } else {
      params.set("limit", itemsPerPage);
    }
    location.route("/?" + params.toString());
  }
  return (
    <form class="items-per-page-container">
      <label for="items-per-page">Items Per Page: </label>
      <select
        class="items-per-page"
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
}
