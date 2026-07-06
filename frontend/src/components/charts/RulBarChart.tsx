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
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
            <XAxis dataKey="engine" stroke="rgb(var(--color-muted))" />
            <YAxis stroke="rgb(var(--color-muted))" />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--color-panel))",
                border: "1px solid rgb(var(--color-border))",
                borderRadius: 8,
                color: "rgb(var(--color-text))"
              }}
            />
            <Bar dataKey="rul" fill="rgb(var(--color-blue))" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
