import { motion } from "framer-motion";
import CountUp from "./CountUp";
import { Badge } from "./ui";

export default function LeaderboardTable({ columns, rows, rankKey = "rank" }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left">
              <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide w-16">Rank</th>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}
                className="border-b border-border/30 last:border-none hover:bg-surface-2/60 transition-colors"
              >
                <td className="px-4 py-3.5">
                  <Badge color={row[rankKey] <= 3 ? "gold" : "muted"}>#{row[rankKey]}</Badge>
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5 text-text">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-muted text-sm">
                  No results match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PointsCell({ value }) {
  return <CountUp value={value} duration={0.8} className="font-semibold text-text" />;
}
