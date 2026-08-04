import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import CountUp from "./CountUp";

const RANK_STYLE = {
  1: {
    order: "md:order-2",
    height: "md:h-[220px]",
    ring: "border-gold/40",
    glow: "shadow-[0_0_40px_-8px_rgba(232,185,77,0.45)]",
    badge: "bg-gradient-to-br from-gold-soft to-gold text-void",
    label: "Champion",
  },
  2: {
    order: "md:order-1",
    height: "md:h-[180px]",
    ring: "border-silver/30",
    glow: "shadow-[0_0_30px_-10px_rgba(199,206,222,0.35)]",
    badge: "bg-gradient-to-br from-silver to-[#94a0b8] text-void",
    label: "Runner-up",
  },
  3: {
    order: "md:order-3",
    height: "md:h-[160px]",
    ring: "border-bronze/30",
    glow: "shadow-[0_0_30px_-10px_rgba(214,138,92,0.35)]",
    badge: "bg-gradient-to-br from-bronze to-[#b56b3f] text-white",
    label: "Second Runner-up",
  },
};

function resolvePath(obj, path) {
  if (!path) return undefined;
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export default function Podium({ items, nameKey = "teamName", subKey, pointsKey = "totalPoints", pointsLabel = "points" }) {
  const [first, second, third] = items;
  const ordered = [second, first, third].filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-10">
      {ordered.map((item, idx) => {
        const rank = item.rank ?? idx + 1;
        const style = RANK_STYLE[rank] || RANK_STYLE[3];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.12, type: "spring", stiffness: 200, damping: 20 }}
            className={`relative ${style.order}`}
          >
            <div
              className={`glass rounded-2xl border ${style.ring} ${style.glow} ${style.height} p-5 flex flex-col justify-end relative overflow-hidden group`}
            >
              <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />
              <div
                className={`absolute -top-3 -right-3 w-16 h-16 rounded-full blur-2xl opacity-30 ${
                  rank === 1 ? "bg-gold" : rank === 2 ? "bg-silver" : "bg-bronze"
                }`}
              />
              <div
                className={`relative w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-lg mb-3 ${style.badge}`}
              >
                {rank}
              </div>
              <p className="relative text-[10px] uppercase tracking-[0.15em] text-muted mb-1">{style.label}</p>
              <h3 className="relative font-display text-lg font-semibold text-text truncate">{item[nameKey]}</h3>
              {subKey && resolvePath(item, subKey) && (
                <p className="relative text-xs text-muted mt-0.5 truncate">{resolvePath(item, subKey)}</p>
              )}
              <div className="relative flex items-center gap-1.5 mt-3">
                <FiAward className="text-gold" size={14} />
                <CountUp value={item[pointsKey]} className="text-base font-semibold text-gradient-gold" />
                <span className="text-xs text-muted">{pointsLabel}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
