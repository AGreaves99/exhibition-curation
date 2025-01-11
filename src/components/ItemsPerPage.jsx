import { useLocation } from "preact-iso";

export function ItemsPerPage() {
  const location = useLocation();
  function handleChange(event) {
    const itemsPerPage = event.target.value;
    location.route("/?limit=" + itemsPerPage);
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
