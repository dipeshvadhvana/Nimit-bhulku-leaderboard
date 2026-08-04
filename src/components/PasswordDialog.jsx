import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiLock, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "saral0369";

export default function PasswordDialog({ open, onClose }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  function handleClose() {
    setValue("");
    setError("");
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      handleClose();
      navigate("/admin");
    } else {
      setError("Incorrect Password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: shake ? [0, -8, 8, -6, 6, 0] : 0,
            }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative glass w-full max-w-sm rounded-2xl p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted hover:text-text transition-colors focus-ring rounded"
            >
              <FiX size={18} />
            </button>
            <div className="w-11 h-11 rounded-xl bg-violet/15 border border-violet/30 flex items-center justify-center mb-4">
              <FiLock className="text-violet-soft" size={18} />
            </div>
            <h2 className="font-display text-lg font-semibold text-text">Admin Access</h2>
            <p className="text-sm text-muted mt-1 mb-4">
              Enter the settings password to open the admin dashboard.
            </p>
            <input
              autoFocus
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-muted/60 focus-ring outline-none"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-bad mt-2"
              >
                {error}
              </motion.p>
            )}
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-violet to-violet-soft text-white text-sm font-medium rounded-xl py-2.5 hover:brightness-110 active:scale-[0.98] transition-all focus-ring"
            >
              Unlock Dashboard
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
