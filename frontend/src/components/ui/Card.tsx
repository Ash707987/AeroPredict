import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <section className={cn("panel p-5", className)}>{children}</section>;
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-app-text">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-app-muted">{subtitle}</p> : null}
    </div>
  );
}
