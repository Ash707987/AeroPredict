import { Link } from "react-router-dom";
import { RulBarChart } from "../components/charts/RulBarChart";
import { StatusPieChart } from "../components/charts/StatusPieChart";
import { SummaryGrid } from "../components/dashboard/SummaryGrid";
import { ResultsTable } from "../components/results/ResultsTable";
import { Card } from "../components/ui/Card";
import { usePrediction } from "../context/PredictionContext";

export function ResultsPage() {
  const { summary } = usePrediction();

  if (!summary) {
    return (
      <div className="page-shell">
        <Card>
          <h1 className="text-2xl font-semibold">No Results Yet</h1>
          <p className="mt-2 text-app-muted">Run a demo or upload a CSV to see prediction results here.</p>
          <div className="mt-6 flex gap-3">
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
        <h1 className="text-2xl font-semibold">Results</h1>
        <p className="mt-1 text-sm text-app-muted">Latest engine RUL prediction output.</p>
      </div>
      <SummaryGrid summary={summary} />
      <div className="grid gap-4 lg:grid-cols-2">
        <StatusPieChart summary={summary} />
        <RulBarChart summary={summary} />
      </div>
      <ResultsTable results={summary.results} />
    </div>
  );
}
