import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo compact />
        <p className="text-xs text-muted text-center">
          © {new Date().getFullYear()} Nimit Bhulku Leaderboard. Built for tracking points, not trophies.
        </p>
      </div>
    </footer>
  );
}
