import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    if (error.response?.data && typeof error.response.data === "object" && "detail" in error.response.data) {
      const detail = error.response.data.detail;
      if (typeof detail === "string") return detail;
    }

    if (error.code === "ERR_NETWORK") {
      return "Cannot reach the backend. Start FastAPI on http://localhost:8000 and try again.";
    }
  }

  return fallback;
}
