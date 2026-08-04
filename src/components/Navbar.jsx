import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiAward, FiBarChart2, FiBookOpen, FiSettings, FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import PasswordDialog from "./PasswordDialog";

const LINKS = [
  { to: "/teams", label: "Teams", icon: FiUsers },
  { to: "/yuvaks", label: "Yuvaks", icon: FiAward },
  { to: "/report", label: "Report", icon: FiBarChart2 },
  { to: "/rulebook", label: "Rulebook", icon: FiBookOpen },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-3">
        <div className="max-w-6xl mx-auto glass rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-lg shadow-black/20">
          <NavLink to="/teams" className="focus-ring rounded-lg">
            <Logo />
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors focus-ring ${
                    isActive ? "text-text" : "text-muted hover:text-text"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-surface-3"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon size={15} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <button
              onClick={() => setPasswordOpen(true)}
              className="ml-1 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-muted hover:text-text transition-colors focus-ring"
            >
              <FiSettings size={15} />
              Settings
            </button>
          </nav>

          <button
            className="md:hidden text-text focus-ring rounded p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden max-w-6xl mx-auto overflow-hidden"
            >
              <div className="glass rounded-2xl mt-2 p-2 flex flex-col gap-1 shadow-lg">
                {LINKS.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? "bg-surface-3 text-text" : "text-muted"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    setPasswordOpen(true);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted text-left"
                >
                  <FiSettings size={16} />
                  Settings
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <PasswordDialog open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </>
  );
}
