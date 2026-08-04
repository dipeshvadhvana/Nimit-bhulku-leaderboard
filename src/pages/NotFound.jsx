import { Link } from "react-router-dom";
import { Button } from "../components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="font-display text-6xl font-bold text-gradient-violet mb-3">404</p>
      <h1 className="font-display text-xl font-semibold text-text mb-2">Page not found</h1>
      <p className="text-muted mb-6 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. Head back to the leaderboard.
      </p>
      <Link to="/teams">
        <Button>Back to Teams</Button>
      </Link>
    </div>
  );
}
