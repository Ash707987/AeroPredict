import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  note?: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "yellow" | "red";
}

const toneMap = {
  blue: "bg-blue-500/15 text-blue-300",
  green: "bg-emerald-500/15 text-emerald-300",
  yellow: "bg-yellow-500/15 text-yellow-300",
  red: "bg-red-500/15 text-red-300"
};

export function StatCard({ title, value, note, icon: Icon, tone = "blue" }: StatCardProps) {
  return (
    <Card className="min-h-32">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-app-muted">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-app-text">{value}</p>
          {note ? <p className="mt-2 text-xs text-app-muted">{note}</p> : null}
        </div>
        <span className={`rounded-md p-2 ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </Card>
  );
}
