import { ArrowDownUp, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { statusClasses } from "../../lib/utils";
import type { EngineStatus, PredictionResult } from "../../types/prediction";
import { Card } from "../ui/Card";

export function ResultsTable({ results }: { results: PredictionResult[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<EngineStatus | "All">("All");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    return results
      .filter((item) => String(item.engine_id).includes(query.trim()))
      .filter((item) => (status === "All" ? true : item.status === status))
      .sort((a, b) => (sortAsc ? a.predicted_rul - b.predicted_rul : b.predicted_rul - a.predicted_rul));
  }, [query, results, sortAsc, status]);

  function downloadCsv() {
    const rows = ["engine_id,predicted_rul,status", ...filtered.map((item) => `${item.engine_id},${item.predicted_rul},${item.status}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "aeropredict-results.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Prediction Results</h2>
          <p className="text-sm text-app-muted">Search, filter, and export the prediction table.</p>
        </div>
        <button className="btn-secondary" onClick={downloadCsv}>
          <Download className="h-4 w-4" />
          Download CSV
        </button>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_180px_160px]">
        <input
          className="input"
          placeholder="Search engine id"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search engine id"
        />
        <select className="input" value={status} onChange={(event) => setStatus(event.target.value as EngineStatus | "All")}>
          <option>All</option>
          <option>Healthy</option>
          <option>Warning</option>
          <option>Critical</option>
        </select>
        <button className="btn-secondary" onClick={() => setSortAsc((value) => !value)}>
          <ArrowDownUp className="h-4 w-4" />
          Sort RUL
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-app-border text-app-muted">
            <tr>
              <th className="py-3">Engine ID</th>
              <th className="py-3">Predicted RUL</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.engine_id} className="border-b border-app-border/70">
                <td className="py-3">#{item.engine_id}</td>
                <td className="py-3">{item.predicted_rul.toFixed(1)} cycles</td>
                <td className="py-3">
                  <span className={`badge ${statusClasses(item.status)}`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
