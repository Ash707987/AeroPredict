import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PredictionProvider } from "./context/PredictionContext";
import { router } from "./routes";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PredictionProvider>
          <RouterProvider router={router} />
        </PredictionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
