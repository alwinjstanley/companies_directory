import React from "react";

export default function Pagination({ page, perPage, total, onPage }) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages === 0) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
        className="page-btn"
      >
        Prev
      </button>

      <span className="page-info">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
        className="page-btn"
      >
        Next
      </button>
    </div>
  );
}
