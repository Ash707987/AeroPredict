import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BackendUploadResponse, EngineStatus, PredictionSummary } from "../types/prediction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusFromRul(rul: number): EngineStatus {
  if (rul < 50) return "Critical";
  if (rul < 120) return "Warning";
  return "Healthy";
}

export function normalizePredictionResponse(data: BackendUploadResponse): PredictionSummary {
  if (data.results?.length) {
    return {
      total_engines: data.total_engines ?? data.results.length,
      healthy: data.healthy ?? data.results.filter((item) => item.status === "Healthy").length,
      warning: data.warning ?? data.results.filter((item) => item.status === "Warning").length,
      critical: data.critical ?? data.results.filter((item) => item.status === "Critical").length,
      average_rul:
        data.average_rul ??
        data.results.reduce((sum, item) => sum + item.predicted_rul, 0) / Math.max(data.results.length, 1),
      results: data.results
    };
  }

  const values = data.predictions ?? [];
  const results = values.map((value, index) => ({
    engine_id: index + 1,
    predicted_rul: Number(value.toFixed(1)),
    status: getStatusFromRul(value)
  }));

  return {
    total_engines: data.total_rows ?? results.length,
    healthy: results.filter((item) => item.status === "Healthy").length,
    warning: results.filter((item) => item.status === "Warning").length,
    critical: results.filter((item) => item.status === "Critical").length,
    average_rul: results.reduce((sum, item) => sum + item.predicted_rul, 0) / Math.max(results.length, 1),
    results
  };
}

export function statusClasses(status: EngineStatus) {
  if (status === "Healthy") return "bg-emerald-500/15 text-emerald-500";
  if (status === "Warning") return "bg-yellow-500/15 text-yellow-600";
  return "bg-red-500/15 text-red-500";
}
