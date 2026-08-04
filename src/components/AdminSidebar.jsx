import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiAward,
  FiActivity,
  FiTrendingUp,
  FiFileText,
  FiBookOpen,
  FiSettings,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/teams", label: "Teams", icon: FiUsers },
  { to: "/admin/yuvaks", label: "Yuvaks", icon: FiAward },
  { to: "/admin/activities", label: "Activities", icon: FiActivity },
  { to: "/admin/leaderboard", label: "Leaderboard", icon: FiTrendingUp },
  { to: "/admin/rulebook", label: "Rulebook", icon: FiBookOpen },
  { to: "/admin/reports", label: "Reports", icon: FiFileText },
  { to: "/admin/settings", label: "Settings", icon: FiSettings },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const content = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-border/60">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "bg-surface-3 text-text" : "text-muted hover:bg-surface-2 hover:text-text"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-border/60">
        <button
          onClick={() => navigate("/teams")}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-surface-2 hover:text-bad transition-colors"
        >
          <FiLogOut size={16} />
          Exit Admin
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 glass rounded-xl p-2.5 text-text"
        aria-label="Open sidebar"
      >
        <FiMenu size={18} />
      </button>

      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-border/60 bg-surface/80 backdrop-blur-xl z-30">
        {content}
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="relative w-64 h-full bg-surface border-r border-border/60">{content}</aside>
        </div>
      )}
    </>
  );
}
