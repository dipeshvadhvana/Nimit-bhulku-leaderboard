import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiCalendar } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { useToast } from "../../hooks/useToast";
import { Button, Card } from "../../components/ui";
import Modal from "../../components/Modal";

export default function AdminActivities() {
  const { activities, addActivity, deleteActivity } = useAppData();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", points: "", date: "" });

  function handleCreate(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    addActivity({ title: form.title, points: Number(form.points) || 0, date: form.date });
    showToast("Activity added", "success");
    setModalOpen(false);
    setForm({ title: "", points: "", date: "" });
  }

  function handleDelete(a) {
    deleteActivity(a.id);
    showToast(`${a.title} removed`, "info");
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-10 lg:mt-0">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Activities</h1>
          <p className="text-muted mt-1.5">Events that award points across the competition.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 shrink-0">
          <FiPlus size={16} /> New Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.3) }}
          >
            <Card className="p-5" hover>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-violet/15 border border-violet/25 flex items-center justify-center text-violet-soft">
                  <FiCalendar size={15} />
                </div>
                <button onClick={() => handleDelete(a)} className="p-1.5 rounded-lg text-muted hover:text-bad hover:bg-surface-3 transition-colors" aria-label="Delete activity">
                  <FiTrash2 size={14} />
                </button>
              </div>
              <h3 className="font-medium text-text text-sm mb-1">{a.title}</h3>
              <p className="text-xs text-muted mb-3">{a.date}</p>
              <p className="font-mono text-gold font-semibold">{a.points.toLocaleString("en-IN")} pts</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Activity">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
              placeholder="e.g. Quiz Competition"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Points</label>
            <input
              type="number"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
            />
          </div>
          <Button type="submit" className="mt-1">Add Activity</Button>
        </form>
      </Modal>
    </div>
  );
}
