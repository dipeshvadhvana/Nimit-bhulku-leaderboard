import { motion } from "framer-motion";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import CountUp from "./CountUp";
import { Badge } from "./ui";

export default function TeamCard({ team, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5 flex flex-col gap-4 hover:border-violet/25 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}99)` }}
          >
            {team.teamName.split(" ").pop()[0]}
          </div>
          <div>
            <h3 className="font-display font-semibold text-text text-sm">{team.teamName}</h3>
            <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
              <FiUserCheck size={11} /> {team.mentor}
            </p>
          </div>
        </div>
        <Badge color={team.rank <= 3 ? "gold" : "muted"}>#{team.rank}</Badge>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-muted text-xs">
          <FiUsers size={13} />
          {team.members} members
        </div>
        <CountUp value={team.totalPoints} className="text-lg font-semibold text-gradient-violet" />
      </div>
    </motion.div>
  );
}
