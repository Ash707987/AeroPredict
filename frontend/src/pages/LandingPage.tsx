import { Activity, BarChart3, Brain, FileUp, LogIn, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";

const features = [
  { title: "AI Prediction", text: "Uses an XGBoost model trained on turbofan data.", icon: Brain },
  { title: "CSV Upload", text: "Upload sensor rows and get RUL estimates back.", icon: FileUp },
  { title: "Dashboard", text: "View health counts, charts, and engine-level results.", icon: BarChart3 }
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="page-shell flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-app-blue">
            <Activity className="h-5 w-5" />
          </span>
          AeroPredict
        </Link>
        <div className="flex gap-2">
          <Link to="/login" className="btn-secondary">
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        </div>
      </header>

      <main className="page-shell">
        <section className="grid min-h-[68vh] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-4 text-sm font-medium text-blue-300">Aircraft maintenance + machine learning</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Aircraft Engine Predictive Maintenance Powered by AI
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-app-muted">
              AeroPredict is a beginner-built but serious dashboard for estimating Remaining Useful Life from aircraft
              engine sensor data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/demo" className="btn-primary">
                <Activity className="h-4 w-4" />
                Try Demo
              </Link>
              <Link to="/upload" className="btn-secondary">
                <Upload className="h-4 w-4" />
                Upload CSV
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="panel p-5"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-app-muted">Demo engine health</p>
                <h2 className="text-xl font-semibold">RUL Overview</h2>
              </div>
              <span className="badge bg-blue-500/15 text-blue-300">Live UI</span>
            </div>
            <div className="space-y-4">
              {[
                ["Engine 01", "181 cycles", "Healthy", "bg-emerald-400"],
                ["Engine 04", "96 cycles", "Warning", "bg-yellow-300"],
                ["Engine 06", "36 cycles", "Critical", "bg-red-400"]
              ].map(([engine, rul, status, color]) => (
                <div key={engine} className="rounded-md border border-app-border bg-app-panel2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{engine}</span>
                    <span className="text-sm text-app-muted">{rul}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-app-bg">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: status === "Healthy" ? "78%" : status === "Warning" ? "46%" : "18%" }} />
                  </div>
                  <p className="mt-2 text-xs text-app-muted">{status}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="grid gap-4 pb-12 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <feature.icon className="mb-4 h-6 w-6 text-blue-300" />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-app-muted">{feature.text}</p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
