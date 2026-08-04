import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { FiUsers, FiAward, FiTrendingUp, FiBarChart2, FiStar, FiTarget } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { StatCard, Card } from "../../components/ui";
import PageTransition from "../../components/PageTransition";

const PIE_COLORS = ["#F97316", "#E8B94D", "#4ade80", "#f87171", "#38bdf8", "#f472b6"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-muted mb-1">{label}</p>
      <p className="font-mono font-semibold text-text">{payload[0].value.toLocaleString("en-IN")} pts</p>
    </div>
  );
}

export default function ReportPage() {
  const { reportStats, teams, categoryPoints } = useAppData();

  const teamChartData = teams.map((t) => ({ name: t.teamName.replace("Team ", ""), points: t.totalPoints }));

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-soft font-medium mb-2">Analytics</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text">Performance Report</h1>
        <p className="text-muted mt-2 max-w-lg">A live snapshot of every team, scorer, and category in the competition.</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={FiUsers} label="Total Teams" value={reportStats.totalTeams} accent="violet" delay={0} />
        <StatCard icon={FiAward} label="Total Yuvaks" value={reportStats.totalYuvaks} accent="violet" delay={0.05} />
        <StatCard icon={FiTrendingUp} label="Total Points" value={reportStats.totalPoints.toLocaleString("en-IN")} accent="gold" delay={0.1} />
        <StatCard icon={FiBarChart2} label="Average Points" value={reportStats.averagePoints.toLocaleString("en-IN")} accent="violet" delay={0.15} />
        <StatCard icon={FiStar} label="Highest Team" value={reportStats.highestTeam?.teamName} accent="gold" delay={0.2} />
        <StatCard icon={FiTarget} label="Highest Scorer" value={reportStats.highestScorer?.name} accent="gold" delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Card className="p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-display font-semibold text-text mb-4">Team Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamChartData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3152" vertical={false} />
                <XAxis dataKey="name" stroke="#8b93a7" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b93a7" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(110,86,207,0.08)" }} />
                <Bar dataKey="points" radius={[8, 8, 0, 0]}>
                  {teamChartData.map((entry, i) => (
                    <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-display font-semibold text-text mb-4">Points Share by Team</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teamChartData}
                  dataKey="points"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {teamChartData.map((entry, i) => (
                    <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#8b93a7" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display font-semibold text-text mb-4">Category-wise Points</h3>
        <div className="flex flex-col gap-4">
          {categoryPoints.map((cat, i) => {
            const max = Math.max(...categoryPoints.map((c) => c.points));
            const pct = Math.round((cat.points / max) * 100);
            return (
              <div key={cat.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-text">{cat.category}</span>
                  <span className="font-mono text-muted">{cat.points.toLocaleString("en-IN")}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${PIE_COLORS[i % PIE_COLORS.length]}, ${PIE_COLORS[i % PIE_COLORS.length]}99)` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageTransition>
  );
}
