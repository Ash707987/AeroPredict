import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { PredictionSummary } from "../types/prediction";

interface PredictionContextValue {
  summary: PredictionSummary | null;
  setSummary: (summary: PredictionSummary) => void;
}

const PredictionContext = createContext<PredictionContextValue | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [summary, setSummary] = useState<PredictionSummary | null>(null);
  const value = useMemo(() => ({ summary, setSummary }), [summary]);

  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>;
}

export function usePrediction() {
  const context = useContext(PredictionContext);

  if (!context) {
    throw new Error("usePrediction must be used inside PredictionProvider");
  }

  return context;
}
