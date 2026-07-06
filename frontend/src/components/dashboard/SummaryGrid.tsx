import { Activity, AlertTriangle, CheckCircle2, Gauge, Plane } from "lucide-react";
import type { PredictionSummary } from "../../types/prediction";
import { StatCard } from "../ui/StatCard";

export function SummaryGrid({ summary }: { summary: PredictionSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard title="Total Engines" value={summary.total_engines} icon={Plane} note="Rows analyzed" />
      <StatCard title="Healthy" value={summary.healthy} icon={CheckCircle2} tone="green" />
      <StatCard title="Warning" value={summary.warning} icon={Gauge} tone="yellow" />
      <StatCard title="Critical" value={summary.critical} icon={AlertTriangle} tone="red" />
      <StatCard title="Average RUL" value={summary.average_rul.toFixed(1)} icon={Activity} note="cycles left" />
    </div>
  );
}
