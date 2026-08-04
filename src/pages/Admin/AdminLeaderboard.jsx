import { useState } from "react";
import { useAppData } from "../../hooks/useAppData";
import LeaderboardTable, { PointsCell } from "../../components/LeaderboardTable";
import { Button } from "../../components/ui";

export default function AdminLeaderboard() {
  const { teams, yuvaks } = useAppData();
  const [tab, setTab] = useState("teams");

  const teamColumns = [
    { key: "teamName", label: "Team", render: (r) => <span className="font-medium">{r.teamName}</span> },
    { key: "mentor", label: "Mentor" },
    { key: "members", label: "Members" },
    { key: "totalPoints", label: "Points", render: (r) => <PointsCell value={r.totalPoints} /> },
  ];

  const yuvakColumns = [
    { key: "name", label: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "team", label: "Team", render: (r) => r.team?.teamName },
    { key: "points", label: "Points", render: (r) => <PointsCell value={r.points} /> },
  ];

  return (
    <div>
      <div className="mb-6 mt-10 lg:mt-0">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Leaderboard</h1>
        <p className="text-muted mt-1.5">The same rankings your audience sees, read-only here.</p>
      </div>

      <div className="flex gap-2 mb-5">
        <Button variant={tab === "teams" ? "primary" : "ghost"} onClick={() => setTab("teams")}>Teams</Button>
        <Button variant={tab === "yuvaks" ? "primary" : "ghost"} onClick={() => setTab("yuvaks")}>Yuvaks</Button>
      </div>

      {tab === "teams" ? (
        <LeaderboardTable columns={teamColumns} rows={teams} />
      ) : (
        <LeaderboardTable columns={yuvakColumns} rows={yuvaks.slice(0, 30)} />
      )}
    </div>
  );
}
