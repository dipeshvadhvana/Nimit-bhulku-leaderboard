import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { useToast } from "../../hooks/useToast";
import { Button, Badge } from "../../components/ui";
import Modal from "../../components/Modal";
import SearchBar from "../../components/SearchBar";

export default function AdminTeams() {
  const { teams, addTeam, updateTeam, deleteTeam } = useAppData();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ teamName: "", mentor: "" });

  const filtered = teams.filter((t) => t.teamName.toLowerCase().includes(search.toLowerCase()));

  function openCreate() {
    setEditing(null);
    setForm({ teamName: "", mentor: "" });
    setModalOpen(true);
  }

  function openEdit(team) {
    setEditing(team);
    setForm({ teamName: team.teamName, mentor: team.mentor });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.teamName.trim() || !form.mentor.trim()) return;
    if (editing) {
      updateTeam(editing.id, form);
      showToast("Team updated", "success");
    } else {
      addTeam(form);
      showToast("Team created", "success");
    }
    setModalOpen(false);
  }

  function handleDelete(team) {
    deleteTeam(team.id);
    showToast(`${team.teamName} removed`, "info");
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-10 lg:mt-0">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Teams</h1>
          <p className="text-muted mt-1.5">Manage teams — totals stay in sync with member points automatically.</p>
        </div>
        <Button onClick={openCreate} className="flex items-center gap-2 shrink-0">
          <FiPlus size={16} /> New Team
        </Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search teams..." className="max-w-sm mb-5" />

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Rank</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Team</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Mentor</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Members</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Points</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-border/30 last:border-none hover:bg-surface-2/60">
                  <td className="px-4 py-3.5"><Badge color={t.rank <= 3 ? "gold" : "muted"}>#{t.rank}</Badge></td>
                  <td className="px-4 py-3.5 font-medium text-text">{t.teamName}</td>
                  <td className="px-4 py-3.5 text-muted">{t.mentor}</td>
                  <td className="px-4 py-3.5 text-muted">{t.members}</td>
                  <td className="px-4 py-3.5 font-mono text-text">{t.totalPoints.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(t)} className="p-2 rounded-lg text-muted hover:text-violet-soft hover:bg-surface-3 transition-colors" aria-label="Edit team">
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(t)} className="p-2 rounded-lg text-muted hover:text-bad hover:bg-surface-3 transition-colors" aria-label="Delete team">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted text-sm">No teams found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Team" : "New Team"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Team Name</label>
            <input
              value={form.teamName}
              onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
              placeholder="e.g. Team Radiance"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Mentor</label>
            <input
              value={form.mentor}
              onChange={(e) => setForm({ ...form, mentor: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
              placeholder="Mentor name"
            />
          </div>
          <Button type="submit" className="mt-1">{editing ? "Save Changes" : "Create Team"}</Button>
        </form>
      </Modal>
    </div>
  );
}
