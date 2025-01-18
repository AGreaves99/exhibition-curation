import ResponsivePagination from "react-responsive-pagination";
import { useLocation } from "preact-iso";
import "../styles/pagination.css";

export function Pagination({ totalPages }) {
  const location = useLocation();
  const params = new URLSearchParams(location.query);
  function handlePageChange(page) {
    params.set("page", page);
    location.route("/?" + params.toString());
  }

  return (
    <div class="pagination-container">
      <ResponsivePagination
        current={Number(location.query.page) || 1}
        total={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
