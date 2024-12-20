import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  setPageCurrent,
  totalItem,
  limit,
  setLimitData,
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageCurrent(page);
    }
  };

  const handleLimitChange = (event) => {
    const limit = parseInt(event.target.value);
    setLimitData(limit);
    setPageCurrent(1); // Reset to page 1 when limit changes
  };

  const getPageList = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4 w-full">
      <div className="flex flex-row justify-start items-center space-x-3">
        <span className="text-sm text-gray-700">
          Showing {currentPage * limit - limit + 1} to{" "}
          {Math.min(currentPage * limit, totalItem)} of{" "}
          <strong>{totalItem.toLocaleString("id-ID")}</strong> results
        </span>

        <select
          value={limit}
          onChange={handleLimitChange}
          className="border border-slate-300 rounded-md px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded-md"
        >
          Prev
        </button>

        {getPageList().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === "number") handlePageChange(page);
            }}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            disabled={typeof page === "string"}
          >
            {page.toLocaleString("id-ID")}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
