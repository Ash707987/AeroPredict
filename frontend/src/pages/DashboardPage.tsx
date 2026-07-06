import { Link } from "react-router-dom";
import { RulBarChart } from "../components/charts/RulBarChart";
import { StatusPieChart } from "../components/charts/StatusPieChart";
import { SummaryGrid } from "../components/dashboard/SummaryGrid";
import { Card } from "../components/ui/Card";
import { usePrediction } from "../context/PredictionContext";

export function DashboardPage() {
  const { summary } = usePrediction();

  if (!summary) {
    return (
      <div className="page-shell">
        <Card className="max-w-2xl">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-3 text-app-muted">
            No prediction data is loaded yet. Try the demo or upload a CSV to fill this page.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/demo" className="btn-primary">Try Demo</Link>
            <Link to="/upload" className="btn-secondary">Upload CSV</Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-shell space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-app-muted">Quick health summary for the latest prediction run.</p>
      </div>
      <SummaryGrid summary={summary} />
      <div className="grid gap-4 lg:grid-cols-2">
        <StatusPieChart summary={summary} />
        <RulBarChart summary={summary} />
      </div>
    </div>
  );
}
