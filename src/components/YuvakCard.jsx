import { motion } from "framer-motion";
import CountUp from "./CountUp";
import { Badge } from "./ui";

export default function YuvakCard({ yuvak, index = 0 }) {
  const initials = yuvak.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5 flex flex-col gap-3 hover:border-violet/25 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-3 border border-border flex items-center justify-center font-display text-sm font-semibold text-text">
            {initials}
          </div>
          <div>
            <h3 className="font-medium text-text text-sm">{yuvak.name}</h3>
            <p className="text-xs text-muted mt-0.5">{yuvak.team?.teamName}</p>
          </div>
        </div>
        <Badge color={yuvak.rank <= 3 ? "gold" : "muted"}>#{yuvak.rank}</Badge>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-xs text-muted">{yuvak.team?.mentor}</span>
        <CountUp value={yuvak.points} className="text-base font-semibold text-gradient-gold" />
      </div>
    </motion.div>
  );
}
