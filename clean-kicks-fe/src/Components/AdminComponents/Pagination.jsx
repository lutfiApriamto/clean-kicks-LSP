export default function Pagination({
  totalPages,
  currentPage,
  paginate,
  className,
}) {
  return (
    <div className={`flex justify-center mt-6 items-center space-x-4 ${className}`}>
      {/* Tombol Previous */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-orange-500 text-white font-medium rounded disabled:opacity-50 hover:bg-orange-600 transition"
      >
        Previous
      </button>

      {/* Indikator Halaman */}
      <span className="text-base font-semibold text-orange-700">
        {totalPages === 0
          ? `${currentPage} of ${totalPages}`
          : `${currentPage + 1} of ${totalPages}`}
      </span>

      {/* Tombol Next */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage + 1 === totalPages || currentPage === totalPages}
        className="px-4 py-2 bg-orange-500 text-white font-medium rounded disabled:opacity-50 hover:bg-orange-600 transition"
      >
        Next
      </button>
    </div>
  );
}
