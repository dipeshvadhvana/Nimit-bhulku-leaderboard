import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { useToast } from "../../hooks/useToast";
import { Button, Badge } from "../../components/ui";
import Modal from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 12;

export default function AdminYuvaks() {
  const { yuvaks, teams, updateYuvakPoints, addYuvak, deleteYuvak } = useAppData();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", teamId: teams[0]?.id ?? "", points: 0 });
  const [drafts, setDrafts] = useState({});

  const teamOptions = [{ value: "all", label: "All Teams" }, ...teams.map((t) => ({ value: t.id, label: t.teamName }))];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return yuvaks.filter((y) => {
      const matchesSearch = !q || y.name.toLowerCase().includes(q);
      const matchesTeam = teamFilter === "all" || y.teamId === teamFilter;
      return matchesSearch && matchesTeam;
    });
  }, [yuvaks, search, teamFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSavePoints(yuvakId) {
    const val = drafts[yuvakId];
    if (val === undefined) return;
    updateYuvakPoints(yuvakId, val);
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[yuvakId];
      return next;
    });
    showToast("Points updated — team totals refreshed", "success");
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.teamId) return;
    addYuvak({ name: form.name, teamId: form.teamId, points: Number(form.points) || 0 });
    showToast("Yuvak added", "success");
    setModalOpen(false);
    setForm({ name: "", teamId: teams[0]?.id ?? "", points: 0 });
  }

  function handleDelete(y) {
    deleteYuvak(y.id);
    showToast(`${y.name} removed`, "info");
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-10 lg:mt-0">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Yuvaks</h1>
          <p className="text-muted mt-1.5">Edit any Yuvak&apos;s points — their team total updates instantly, everywhere.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 shrink-0">
          <FiPlus size={16} /> New Yuvak
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name..." className="flex-1" />
        <FilterDropdown label="Team" value={teamFilter} options={teamOptions} onChange={(v) => { setTeamFilter(v); setPage(1); }} className="sm:w-56" />
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Rank</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Name</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Team</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Points</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((y) => (
                <motion.tr key={y.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-border/30 last:border-none hover:bg-surface-2/60">
                  <td className="px-4 py-3.5"><Badge color={y.rank <= 3 ? "gold" : "muted"}>#{y.rank}</Badge></td>
                  <td className="px-4 py-3.5 font-medium text-text">{y.name}</td>
                  <td className="px-4 py-3.5 text-muted">{y.team?.teamName}</td>
                  <td className="px-4 py-3.5">
                    <input
                      type="number"
                      defaultValue={y.points}
                      onChange={(e) => setDrafts((prev) => ({ ...prev, [y.id]: e.target.value }))}
                      className="w-28 bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 text-sm text-text focus-ring outline-none font-mono"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSavePoints(y.id)}
                        className="p-2 rounded-lg text-muted hover:text-good hover:bg-surface-3 transition-colors"
                        aria-label="Save points"
                      >
                        <FiSave size={14} />
                      </button>
                      <button onClick={() => handleDelete(y)} className="p-2 rounded-lg text-muted hover:text-bad hover:bg-surface-3 transition-colors" aria-label="Delete yuvak">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-muted text-sm">No Yuvaks found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Yuvak">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Team</label>
            <select
              value={form.teamId}
              onChange={(e) => setForm({ ...form, teamId: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id}>{t.teamName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Starting Points</label>
            <input
              type="number"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none font-mono"
            />
          </div>
          <Button type="submit" className="mt-1">Add Yuvak</Button>
        </form>
      </Modal>
    </div>
  );
}
