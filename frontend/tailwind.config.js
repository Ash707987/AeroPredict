/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "rgb(var(--color-bg) / <alpha-value>)",
          panel: "rgb(var(--color-panel) / <alpha-value>)",
          panel2: "rgb(var(--color-panel-2) / <alpha-value>)",
          border: "rgb(var(--color-border) / <alpha-value>)",
          text: "rgb(var(--color-text) / <alpha-value>)",
          muted: "rgb(var(--color-muted) / <alpha-value>)",
          blue: "rgb(var(--color-blue) / <alpha-value>)"
        }
      },
      boxShadow: {
        soft: "0 12px 35px rgba(0,0,0,0.22)"
      }
    }
  },
  plugins: []
};
