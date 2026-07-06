import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RulBarChart } from "../components/charts/RulBarChart";
import { StatusPieChart } from "../components/charts/StatusPieChart";
import { SummaryGrid } from "../components/dashboard/SummaryGrid";
import { Card } from "../components/ui/Card";
import { usePrediction } from "../context/PredictionContext";
import { getDemoPrediction } from "../services/predictionService";

export function DemoPage() {
  const { setSummary } = usePrediction();
  const { data, isLoading, isError } = useQuery({ queryKey: ["demo-prediction"], queryFn: getDemoPrediction });

  useEffect(() => {
    if (data) setSummary(data);
  }, [data, setSummary]);

  if (isLoading) return <div className="page-shell text-app-muted">Loading demo data...</div>;

  if (isError || !data) {
    return <div className="page-shell text-red-500">Could not load demo data.</div>;
  }

  return (
    <div className="page-shell space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Demo Dashboard</h1>
          <p className="mt-1 text-sm text-app-muted">A small sample result recruiters can explore without uploading files.</p>
        </div>
        <Link to="/results" className="btn-secondary">Open Results Table</Link>
      </div>
      <SummaryGrid summary={data} />
      <div className="grid gap-4 lg:grid-cols-2">
        <StatusPieChart summary={data} />
        <RulBarChart summary={data} />
      </div>
      <Card>
        <p className="text-sm text-app-muted">
          Demo mode first tries the backend <span className="text-app-text">/predictions/demo</span> endpoint. If that is not
          available yet, the frontend uses a small local sample so the page still works during development.
        </p>
      </Card>
    </div>
  );
}
