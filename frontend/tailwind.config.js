/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#0b0f17",
          panel: "#121826",
          panel2: "#182033",
          border: "#293245",
          text: "#e6edf7",
          muted: "#96a3b7",
          blue: "#4c8bf5"
        }
      },
      boxShadow: {
        soft: "0 12px 35px rgba(0,0,0,0.22)"
      }
    }
  },
  plugins: []
};
