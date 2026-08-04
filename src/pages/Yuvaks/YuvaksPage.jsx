import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAppData } from "../../hooks/useAppData";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import Podium from "../../components/Podium";
import LeaderboardTable, { PointsCell } from "../../components/LeaderboardTable";
import Pagination from "../../components/Pagination";
import PageTransition from "../../components/PageTransition";

const PAGE_SIZE = 10;

export default function YuvaksPage() {
  const { yuvaks, teams } = useAppData();
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [page, setPage] = useState(1);

  const teamOptions = [{ value: "all", label: "All Teams" }, ...teams.map((t) => ({ value: t.id, label: t.teamName }))];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return yuvaks.filter((y) => {
      const matchesSearch = !q || y.name.toLowerCase().includes(q);
      const matchesTeam = teamFilter === "all" || y.teamId === teamFilter;
      return matchesSearch && matchesTeam;
    });
  }, [yuvaks, search, teamFilter]);

  const top3 = teamFilter === "all" && !search ? yuvaks.slice(0, 3) : [];
  const rest = top3.length ? filtered.filter((y) => !top3.some((t) => t.id === y.id)) : filtered;
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const paged = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: "name", label: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "team", label: "Team", render: (r) => r.team?.teamName },
    { key: "mentor", label: "Mentor", render: (r) => r.team?.mentor },
    { key: "points", label: "Points", render: (r) => <PointsCell value={r.points} /> },
  ];

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-soft font-medium mb-2">Individuals</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text">Yuvak Leaderboard</h1>
        <p className="text-muted mt-2 max-w-lg">Ranked across all 160 participants, updated the moment any score changes.</p>
      </motion.div>

      {top3.length > 0 && <Podium items={top3} nameKey="name" subKey="team.teamName" pointsKey="points" />}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Search by name..."
          className="flex-1"
        />
        <FilterDropdown
          label="Team"
          value={teamFilter}
          options={teamOptions}
          onChange={(v) => { setTeamFilter(v); setPage(1); }}
          className="sm:w-56"
        />
      </div>

      <LeaderboardTable columns={columns} rows={paged} />

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </PageTransition>
  );
}
