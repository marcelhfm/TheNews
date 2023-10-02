import React from "react";

interface IPagination {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  totalPages: number;
}

export const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: IPagination) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePreviousClick = () => {
    if (!isPreviousDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate the range of page numbers to display
  const maxPagesToShow = 5;
  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  if (endPage - startPage + 1 < maxPagesToShow) {
    // Adjust the startPage if there are not enough pages to show
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  // Generate the page numbers in the calculated range
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="flex justify-center items-center">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={handlePreviousClick}
              className={`flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                isPreviousDisabled ? "cursor-not-allowed" : ""
              }`}
              disabled={isPreviousDisabled}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => onPageChange(pageNumber)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border-gray-300  border  ${
                  currentPage === pageNumber
                    ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500   hover:bg-gray-100 hover:text-gray-700 bg-white"
                }`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNextClick}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                isNextDisabled ? "cursor-not-allowed" : ""
              }`}
              disabled={isNextDisabled}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
