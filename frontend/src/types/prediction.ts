export type EngineStatus = "Healthy" | "Warning" | "Critical";

export interface PredictionResult {
  engine_id: number;
  predicted_rul: number;
  status: EngineStatus;
}

export interface PredictionSummary {
  total_engines: number;
  healthy: number;
  warning: number;
  critical: number;
  average_rul: number;
  results: PredictionResult[];
}

export interface BackendUploadResponse {
  total_engines?: number;
  total_rows?: number;
  healthy?: number;
  warning?: number;
  critical?: number;
  average_rul?: number;
  results?: PredictionResult[];
  predictions?: number[];
}
