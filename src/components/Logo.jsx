export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet to-violet-soft flex items-center justify-center shadow-lg shadow-violet/30">
        <span className="font-display font-bold text-white text-sm">NB</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold border-2 border-void" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display font-semibold text-[15px] text-text tracking-tight">
            NIMIT BHULKU
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted -mt-0.5">
            Leaderboard
          </p>
        </div>
      )}
    </div>
  );
}
