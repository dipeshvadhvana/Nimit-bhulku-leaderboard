import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAppData } from "../../hooks/useAppData";
import SearchBar from "../../components/SearchBar";
import Podium from "../../components/Podium";
import LeaderboardTable, { PointsCell } from "../../components/LeaderboardTable";
import Pagination from "../../components/Pagination";
import PageTransition from "../../components/PageTransition";

const PAGE_SIZE = 8;

export default function TeamsPage() {
  const { teams } = useAppData();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) => t.teamName.toLowerCase().includes(q) || t.mentor.toLowerCase().includes(q)
    );
  }, [teams, search]);

  const top3 = teams.slice(0, 3);
  const rest = filtered.filter((t) => !top3.some((top) => top.id === t.id));
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const paged = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: "teamName", label: "Team", render: (r) => <span className="font-medium">{r.teamName}</span> },
    { key: "mentor", label: "Mentor" },
    { key: "members", label: "Members" },
    { key: "totalPoints", label: "Points", render: (r) => <PointsCell value={r.totalPoints} /> },
  ];

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-soft font-medium mb-2">Standings</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text">Team Leaderboard</h1>
        <p className="text-muted mt-2 max-w-lg">
          Team totals are calculated live from every Yuvak&apos;s points — nothing here is entered by hand.
        </p>
      </motion.div>

      {!search && <Podium items={top3} nameKey="teamName" subKey="mentor" pointsKey="totalPoints" />}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search team or mentor..." className="max-w-sm" />
      </div>

      <LeaderboardTable columns={columns} rows={search ? filtered : paged} />

      {!search && (
        <div className="mt-6">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </PageTransition>
  );
}
