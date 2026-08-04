import { motion } from "framer-motion";
import { FiUsers, FiAward, FiTrendingUp, FiActivity } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { StatCard, Card, Badge } from "../../components/ui";
import CountUp from "../../components/CountUp";

export default function AdminDashboard() {
  const { reportStats, teams, yuvaks, activities } = useAppData();

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-10 lg:mt-0">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Dashboard</h1>
        <p className="text-muted mt-1.5">Overview of the entire leaderboard, live.</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FiUsers} label="Teams" value={reportStats.totalTeams} accent="violet" />
        <StatCard icon={FiAward} label="Yuvaks" value={reportStats.totalYuvaks} accent="violet" />
        <StatCard icon={FiTrendingUp} label="Total Points" value={reportStats.totalPoints.toLocaleString("en-IN")} accent="gold" delay={0.05} />
        <StatCard icon={FiActivity} label="Activities" value={activities.length} accent="good" delay={0.1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <h3 className="font-display font-semibold text-text mb-4">Top Teams</h3>
          <div className="flex flex-col gap-3">
            {teams.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <Badge color={t.rank <= 3 ? "gold" : "muted"}>#{t.rank}</Badge>
                  <span className="text-sm text-text">{t.teamName}</span>
                </div>
                <CountUp value={t.totalPoints} duration={0.6} className="text-sm font-semibold text-text" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-semibold text-text mb-4">Top Yuvaks</h3>
          <div className="flex flex-col gap-3">
            {yuvaks.slice(0, 5).map((y) => (
              <div key={y.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <Badge color={y.rank <= 3 ? "gold" : "muted"}>#{y.rank}</Badge>
                  <span className="text-sm text-text">{y.name}</span>
                </div>
                <CountUp value={y.points} duration={0.6} className="text-sm font-semibold text-text" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
