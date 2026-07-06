import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { PredictionSummary } from "../../types/prediction";
import { Card, CardHeader } from "../ui/Card";

const colors = ["#34d399", "#facc15", "#f87171"];

export function StatusPieChart({ summary }: { summary: PredictionSummary }) {
  const data = [
    { name: "Healthy", value: summary.healthy },
    { name: "Warning", value: summary.warning },
    { name: "Critical", value: summary.critical }
  ];

  return (
    <Card>
      <CardHeader title="Status Split" subtitle="Simple health distribution" />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgb(var(--color-panel))",
                border: "1px solid rgb(var(--color-border))",
                borderRadius: 8,
                color: "rgb(var(--color-text))"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
