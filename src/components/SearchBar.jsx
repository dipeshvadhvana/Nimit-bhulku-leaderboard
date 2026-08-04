import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface-2 border border-border rounded-xl pl-10 pr-9 py-2.5 text-sm text-text placeholder:text-muted/70 focus-ring outline-none transition-colors focus:border-violet/50"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
        >
          <FiX size={15} />
        </button>
      )}
    </div>
  );
}
