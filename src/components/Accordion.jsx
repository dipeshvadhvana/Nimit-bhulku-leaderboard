import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left focus-ring"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div className="w-8 h-8 rounded-lg bg-violet/15 border border-violet/25 flex items-center justify-center text-violet-soft shrink-0">
                    <item.icon size={14} />
                  </div>
                )}
                <span className="font-display font-medium text-text text-sm">{item.title}</span>
              </div>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown className="text-muted" size={16} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 pb-5 pt-0 text-sm text-muted leading-relaxed border-t border-border/40">
                    <div className="pt-4">{item.content}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
