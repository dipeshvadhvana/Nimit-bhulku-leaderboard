import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export default function FilterDropdown({ label, value, options, onChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none hover:border-violet/40 transition-colors"
      >
        <span className="text-muted mr-1">{label}:</span>
        <span className="truncate">{selected?.label ?? "All"}</span>
        <FiChevronDown className={`text-muted transition-transform shrink-0 ${open ? "rotate-180" : ""}`} size={15} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-full max-h-64 overflow-auto glass rounded-xl shadow-xl p-1"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    opt.value === value ? "bg-surface-3 text-text" : "text-muted hover:bg-surface-3/60 hover:text-text"
                  }`}
                >
                  {opt.label}
                  {opt.value === value && <FiCheck size={14} className="text-violet-soft" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
