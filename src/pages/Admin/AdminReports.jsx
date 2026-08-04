import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { FiUsers, FiAward, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { StatCard, Card } from "../../components/ui";

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

export default function AdminReports() {
  const { reportStats, teams } = useAppData();
  const teamChartData = teams.map((t) => ({ name: t.teamName.replace("Team ", ""), points: t.totalPoints }));

  return (
    <div>
      <div className="mb-6 mt-10 lg:mt-0">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Reports</h1>
        <p className="text-muted mt-1.5">Same analytics as the public report page.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FiUsers} label="Total Teams" value={reportStats.totalTeams} accent="violet" />
        <StatCard icon={FiAward} label="Total Yuvaks" value={reportStats.totalYuvaks} accent="violet" delay={0.05} />
        <StatCard icon={FiTrendingUp} label="Total Points" value={reportStats.totalPoints.toLocaleString("en-IN")} accent="gold" delay={0.1} />
        <StatCard icon={FiBarChart2} label="Average" value={reportStats.averagePoints.toLocaleString("en-IN")} accent="violet" delay={0.15} />
      </div>

      <Card className="p-5">
        <h3 className="font-display font-semibold text-text mb-4">Team Comparison</h3>
        <div className="h-80">
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
    </div>
  );
}
