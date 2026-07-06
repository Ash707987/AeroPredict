import { api } from "./api";
import { normalizePredictionResponse } from "../lib/utils";
import type { BackendUploadResponse, PredictionSummary } from "../types/prediction";

const demoData: PredictionSummary = {
  total_engines: 10,
  healthy: 5,
  warning: 3,
  critical: 2,
  average_rul: 118.6,
  results: [
    { engine_id: 1, predicted_rul: 181.2, status: "Healthy" },
    { engine_id: 2, predicted_rul: 142.8, status: "Healthy" },
    { engine_id: 3, predicted_rul: 41.5, status: "Critical" },
    { engine_id: 4, predicted_rul: 96.1, status: "Warning" },
    { engine_id: 5, predicted_rul: 128.3, status: "Healthy" },
    { engine_id: 6, predicted_rul: 35.8, status: "Critical" },
    { engine_id: 7, predicted_rul: 88.4, status: "Warning" },
    { engine_id: 8, predicted_rul: 155.9, status: "Healthy" },
    { engine_id: 9, predicted_rul: 76.7, status: "Warning" },
    { engine_id: 10, predicted_rul: 239.5, status: "Healthy" }
  ]
};

export async function uploadPrediction(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<BackendUploadResponse>("/predictions/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return normalizePredictionResponse(data);
}

export async function getDemoPrediction() {
  try {
    const { data } = await api.get<BackendUploadResponse>("/predictions/demo");
    return normalizePredictionResponse(data);
  } catch {
    return demoData;
  }
}
