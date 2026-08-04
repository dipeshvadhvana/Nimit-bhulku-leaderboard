import { useState } from "react";
import { FiKey, FiSave } from "react-icons/fi";
import { useToast } from "../../hooks/useToast";
import { Card, Button } from "../../components/ui";

export default function AdminSettings() {
  const { showToast } = useToast();
  const [siteName, setSiteName] = useState("NIMIT BHULKU - Leaderboard");

  function handleSave(e) {
    e.preventDefault();
    showToast("Settings saved locally (no backend connected)", "success");
  }

  return (
    <div>
      <div className="mb-6 mt-10 lg:mt-0">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Settings</h1>
        <p className="text-muted mt-1.5">Frontend-only settings. Connect a backend to persist these.</p>
      </div>

      <Card className="p-5 max-w-lg">
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Site Name</label>
            <input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text focus-ring outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block flex items-center gap-1.5">
              <FiKey size={12} /> Admin Password
            </label>
            <input
              disabled
              value="saral0369"
              className="w-full bg-surface-2/50 border border-border rounded-xl px-4 py-2.5 text-sm text-muted outline-none cursor-not-allowed font-mono"
            />
            <p className="text-xs text-muted mt-1.5">Hardcoded on the frontend for now — move to a real auth system in production.</p>
          </div>
          <Button type="submit" className="flex items-center justify-center gap-2 mt-1">
            <FiSave size={15} /> Save Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}
