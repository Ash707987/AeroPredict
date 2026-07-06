import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { usePrediction } from "../context/PredictionContext";
import { uploadPrediction } from "../services/predictionService";

export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const { setSummary } = usePrediction();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: uploadPrediction,
    onSuccess: (data) => {
      setSummary(data);
      navigate("/results");
    },
    onError: () => setError("Upload failed. Make sure your backend is running and the file format matches the model.")
  });

  function handleFile(nextFile?: File) {
    setError("");
    if (!nextFile) return;
    if (!nextFile.name.toLowerCase().endsWith(".csv") && !nextFile.name.toLowerCase().endsWith(".txt")) {
      setError("Please upload a CSV or NASA-style TXT file.");
      return;
    }
    setFile(nextFile);
  }

  return (
    <div className="page-shell">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Upload Sensor Data</h1>
        <p className="mt-1 text-sm text-app-muted">Upload engine sensor data and let the backend model predict RUL.</p>
      </div>

      <Card>
        <label
          className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-bg p-8 text-center transition hover:border-app-blue"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files[0]);
          }}
        >
          <UploadCloud className="h-12 w-12 text-app-blue" />
          <span className="mt-4 text-lg font-medium">Drop your CSV here</span>
          <span className="mt-2 text-sm text-app-muted">or click to browse from your computer</span>
          <input className="sr-only" type="file" accept=".csv,.txt" onChange={(event) => handleFile(event.target.files?.[0])} />
        </label>

        {file ? <p className="mt-4 text-sm text-app-muted">Selected file: <span className="text-app-text">{file.name}</span></p> : null}
        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

        <div className="mt-6 flex items-center gap-3">
          <button className="btn-primary" disabled={!file || mutation.isPending} onClick={() => file && mutation.mutate(file)}>
            {mutation.isPending ? "Uploading..." : "Run Prediction"}
          </button>
          {mutation.isPending ? <div className="h-2 w-40 overflow-hidden rounded-full bg-app-bg"><div className="h-full w-2/3 animate-pulse rounded-full bg-app-blue" /></div> : null}
        </div>
      </Card>
    </div>
  );
}
