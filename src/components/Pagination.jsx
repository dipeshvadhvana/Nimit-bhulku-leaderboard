import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const windowSize = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= windowSize) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface-2 disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus-ring"
        aria-label="Previous page"
      >
        <FiChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-ring ${
              p === page ? "bg-violet text-white" : "text-muted hover:text-text hover:bg-surface-2"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface-2 disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus-ring"
        aria-label="Next page"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
}
