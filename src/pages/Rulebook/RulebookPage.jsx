import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiGift, FiAlertTriangle, FiInfo } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { Accordion } from "../../components/Accordion";
import PageTransition from "../../components/PageTransition";

const ICONS = {
  book: FiBookOpen,
  gift: FiGift,
  alert: FiAlertTriangle,
  info: FiInfo,
};

export default function RulebookPage() {
  const { rulebookPoints, rulebookSections } = useAppData();

  const items = [
    {
      title: "Points Table",
      icon: FiAward,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {rulebookPoints.map((row) => (
                <tr key={row.id} className="border-b border-border/30 last:border-none">
                  <td className="py-2.5 pr-4 text-text">{row.activity}</td>
                  <td className="py-2.5 font-mono text-gold text-right">{row.points}</td>
                </tr>
              ))}
              {rulebookPoints.length === 0 && (
                <tr>
                  <td className="py-4 text-muted text-center" colSpan={2}>No point entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ),
    },
    ...rulebookSections.map((section) => ({
      title: section.title,
      icon: ICONS[section.icon] || FiInfo,
      content: (
        <ul className="list-disc pl-4 space-y-2">
          {section.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
          {section.bullets.length === 0 && <li className="list-none pl-0 text-muted">No rules added yet.</li>}
        </ul>
      ),
    })),
  ];

  return (
    <PageTransition>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-soft font-medium mb-2">Reference</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text">Rulebook</h1>
        <p className="text-muted mt-2 max-w-lg">Everything about how points are earned, bonused, and finalized.</p>
      </motion.div>

      <Accordion items={items} />
    </PageTransition>
  );
}
