import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { ThemeToggle } from "../components/ui/ThemeToggle";

export function NotFoundPage() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Card className="max-w-md text-center">
        <p className="text-sm text-app-muted">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-app-muted">This route is not part of the AeroPredict frontend yet.</p>
        <Link to="/" className="btn-primary mt-6">Go Home</Link>
      </Card>
    </div>
  );
}
