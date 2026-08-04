import { motion } from "framer-motion";

export function Card({ children, className = "", hover = false, as: As = motion.div, ...props }) {
  return (
    <As
      className={`glass rounded-2xl shadow-lg shadow-black/10 ${hover ? "transition-all duration-300 hover:shadow-violet/10 hover:border-violet/20 hover:-translate-y-0.5" : ""} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}

export function StatCard({ icon: Icon, label, value, accent = "violet", delay = 0 }) {
  const accents = {
    violet: "bg-violet/15 text-violet-soft border-violet/25",
    gold: "bg-gold/15 text-gold border-gold/25",
    good: "bg-good/15 text-good border-good/25",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-2xl p-5 shadow-lg shadow-black/10"
    >
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${accents[accent]}`}>
        <Icon size={17} />
      </div>
      <p className="text-xs text-muted uppercase tracking-wide mb-1">{label}</p>
      <p className="font-display text-2xl font-semibold text-text">{value}</p>
    </motion.div>
  );
}

export function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-violet to-violet-soft text-white hover:brightness-110",
    ghost: "bg-surface-2 text-text hover:bg-surface-3 border border-border",
    danger: "bg-bad/15 text-bad border border-bad/30 hover:bg-bad/25",
  };
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-[0.97] focus-ring ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, color = "violet" }) {
  const colors = {
    violet: "bg-violet/15 text-violet-soft border-violet/25",
    gold: "bg-gold/15 text-gold border-gold/25",
    good: "bg-good/15 text-good border-good/25",
    muted: "bg-surface-3 text-muted border-border",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-surface-3 rounded-xl ${className}`} />;
}
