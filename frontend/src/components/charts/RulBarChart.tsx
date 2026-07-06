import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PredictionSummary } from "../../types/prediction";
import { Card, CardHeader } from "../ui/Card";

export function RulBarChart({ summary }: { summary: PredictionSummary }) {
  const data = summary.results.slice(0, 12).map((item) => ({
    engine: `E${item.engine_id}`,
    rul: item.predicted_rul
  }));

  return (
    <Card>
      <CardHeader title="Remaining Useful Life" subtitle="First 12 engines from the result" />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#293245" />
            <XAxis dataKey="engine" stroke="#96a3b7" />
            <YAxis stroke="#96a3b7" />
            <Tooltip contentStyle={{ background: "#121826", border: "1px solid #293245", borderRadius: 8 }} />
            <Bar dataKey="rul" fill="#4c8bf5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
