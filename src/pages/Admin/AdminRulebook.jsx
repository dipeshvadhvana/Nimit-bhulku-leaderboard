import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiSave, FiBookOpen, FiGift, FiAlertTriangle, FiInfo } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { useToast } from "../../hooks/useToast";
import { Button, Card } from "../../components/ui";
import Modal from "../../components/Modal";

const ICONS = { book: FiBookOpen, gift: FiGift, alert: FiAlertTriangle, info: FiInfo };
const ICON_OPTIONS = [
  { value: "book", label: "Book" },
  { value: "gift", label: "Gift" },
  { value: "alert", label: "Alert" },
  { value: "info", label: "Info" },
];

export default function AdminRulebook() {
  const {
    rulebookPoints, addRulebookPoint, updateRulebookPoint, deleteRulebookPoint,
    rulebookSections, addRulebookSection, updateRulebookSection, deleteRulebookSection,
  } = useAppData();
  const { showToast } = useToast();

  const [pointModalOpen, setPointModalOpen] = useState(false);
  const [pointForm, setPointForm] = useState({ activity: "", points: "" });
  const [pointDrafts, setPointDrafts] = useState({});

  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionForm, setSectionForm] = useState({ title: "", icon: "book", bulletsText: "" });

  // --- Points table handlers ---
  function handleCreatePoint(e) {
    e.preventDefault();
    if (!pointForm.activity.trim() || !pointForm.points.trim()) return;
    addRulebookPoint({ ...pointForm });
    showToast("Rule added to points table", "success");
    setPointModalOpen(false);
    setPointForm({ activity: "", points: "" });
  }

  function handleSavePointRow(id) {
    const draft = pointDrafts[id];
    if (!draft) return;
    updateRulebookPoint(id, draft);
    showToast("Points table row updated", "success");
    setPointDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function handleDeletePoint(row) {
    deleteRulebookPoint(row.id);
    showToast(`"${row.activity}" removed`, "info");
  }

  // --- Section handlers ---
  function openNewSection() {
    setEditingSection(null);
    setSectionForm({ title: "", icon: "book", bulletsText: "" });
    setSectionModalOpen(true);
  }

  function openEditSection(section) {
    setEditingSection(section);
    setSectionForm({ title: section.title, icon: section.icon, bulletsText: section.bullets.join("\n") });
    setSectionModalOpen(true);
  }

  function handleSubmitSection(e) {
    e.preventDefault();
    if (!sectionForm.title.trim()) return;
    const bullets = sectionForm.bulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);
    if (editingSection) {
      updateRulebookSection(editingSection.id, { title: sectionForm.title, icon: sectionForm.icon, bullets });
      showToast("Section updated", "success");
    } else {
      addRulebookSection({ title: sectionForm.title, icon: sectionForm.icon, bullets });
      showToast("Section added", "success");
    }
    setSectionModalOpen(false);
  }

  function handleDeleteSection(section) {
    deleteRulebookSection(section.id);
    showToast(`"${section.title}" section removed`, "info");
  }

  return (
    <div>
      <div className="mb-6 mt-10 lg:mt-0">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Rulebook</h1>
        <p className="text-muted mt-1.5">Edit the points table and rule sections shown on the public Rulebook page.</p>
      </div>

      {/* Points table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-text">Points Table</h2>
        <Button onClick={() => setPointModalOpen(true)} className="flex items-center gap-2">
          <FiPlus size={15} /> Add Row
        </Button>
      </div>

      <div className="glass rounded-2xl overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Activity</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide">Points</th>
                <th className="px-4 py-3.5 text-muted font-medium text-xs uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rulebookPoints.map((row) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-border/30 last:border-none hover:bg-surface-2/60">
                  <td className="px-4 py-3.5">
                    <input
                      defaultValue={row.activity}
                      onChange={(e) => setPointDrafts((prev) => ({ ...prev, [row.id]: { ...prev[row.id], activity: e.target.value } }))}
                      className="w-full bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 text-sm text-text focus-ring outline-none"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <input
                      defaultValue={row.points}
                      onChange={(e) => setPointDrafts((prev) => ({ ...prev, [row.id]: { ...prev[row.id], points: e.target.value } }))}
                      className="w-32 bg-surface-2 border border-border rounded-lg px-2.5 py-1.5 text-sm text-text focus-ring outline-none font-mono"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleSavePointRow(row.id)} className="p-2 rounded-lg text-muted hover:text-good hover:bg-surface-3 transition-colors" aria-label="Save row">
                        <FiSave size={14} />
                      </button>
                      <button onClick={() => handleDeletePoint(row)} className="p-2 rounded-lg text-muted hover:text-bad hover:bg-surface-3 transition-colors" aria-label="Delete row">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {rulebookPoints.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-10 text-center text-muted text-sm">No rows yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sections */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-text">Rule Sections</h2>
        <Button onClick={openNewSection} className="flex items-center gap-2">
          <FiPlus size={15} /> New Section
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {rulebookSections.map((section) => {
          const Icon = ICONS[section.icon] || FiInfo;
          return (
            <Card key={section.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet/15 border border-violet/25 flex items-center justify-center text-violet-soft shrink-0">
                    <Icon size={15} />
                  </div>
                  <h3 className="font-display font-medium text-text">{section.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditSection(section)} className="text-xs px-3 py-1.5 rounded-lg bg-surface-2 text-muted hover:text-text transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteSection(section)} className="p-2 rounded-lg text-muted hover:text-bad hover:bg-surface-3 transition-colors" aria-label="Delete section">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              <ul className="list-disc pl-8 space-y-1.5 text-sm text-muted">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
                {section.bullets.length === 0 && <li className="list-none pl-0">No rules added yet.</li>}
              </ul>
            </Card>
          );
        })}
        {rulebookSections.length === 0 && (
          <p className="text-muted text-sm">No sections yet — add one above.</p>
        )}
      </div>

      {/* Add points modal */}
      <Modal open={pointModalOpen} onClose={() => setPointModalOpen(false)} title="Add Points Row">
        <form onSubmit={handleCreatePoint} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Activity</label>
            <input
              value={pointForm.activity}
              onChange={(e) => setPointForm({ ...pointForm, activity: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
              placeholder="e.g. Best Team Spirit Award"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Points</label>
            <input
              value={pointForm.points}
              onChange={(e) => setPointForm({ ...pointForm, points: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none font-mono"
              placeholder="e.g. 300 pts"
            />
          </div>
          <Button type="submit" className="mt-1">Add Row</Button>
        </form>
      </Modal>

      {/* Section modal */}
      <Modal open={sectionModalOpen} onClose={() => setSectionModalOpen(false)} title={editingSection ? "Edit Section" : "New Section"}>
        <form onSubmit={handleSubmitSection} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Section Title</label>
            <input
              value={sectionForm.title}
              onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
              placeholder="e.g. Safety Rules"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Icon</label>
            <div className="flex gap-2">
              {ICON_OPTIONS.map((opt) => {
                const OptIcon = ICONS[opt.value];
                const active = sectionForm.icon === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setSectionForm({ ...sectionForm, icon: opt.value })}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                      active ? "bg-violet/20 border-violet/50 text-violet-soft" : "bg-surface-2 border-border text-muted hover:text-text"
                    }`}
                    aria-label={opt.label}
                  >
                    <OptIcon size={15} />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Rules (one per line)</label>
            <textarea
              value={sectionForm.bulletsText}
              onChange={(e) => setSectionForm({ ...sectionForm, bulletsText: e.target.value })}
              rows={6}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none resize-none"
              placeholder={"Each line becomes one bullet point.\nAdd as many rules as you like."}
            />
          </div>
          <Button type="submit" className="mt-1">{editingSection ? "Save Changes" : "Add Section"}</Button>
        </form>
      </Modal>
    </div>
  );
}
