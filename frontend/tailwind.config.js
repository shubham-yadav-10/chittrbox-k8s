import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        aurora: {
          primary: "#7c86ff",
          "primary-content": "#ffffff",
          secondary: "#2dd4bf",
          "secondary-content": "#042f2e",
          accent: "#f472b6",
          "accent-content": "#ffffff",
          neutral: "#171a2e",
          "neutral-content": "#c7cbe3",
          "base-100": "#0d0f1c",
          "base-200": "#141729",
          "base-300": "#1e2337",
          "base-content": "#e4e7f7",
          info: "#38bdf8",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#fb7185",
          "--rounded-box": "1.25rem",
          "--rounded-btn": "0.75rem",
        },
        daylight: {
          primary: "#5b5fe0",
          "primary-content": "#ffffff",
          secondary: "#0d9488",
          "secondary-content": "#ffffff",
          accent: "#db2777",
          "accent-content": "#ffffff",
          neutral: "#1e293b",
          "neutral-content": "#e2e8f0",
          "base-100": "#f7f8fd",
          "base-200": "#eef0fa",
          "base-300": "#e2e5f2",
          "base-content": "#1e2340",
          info: "#0284c7",
          success: "#059669",
          warning: "#d97706",
          error: "#e11d48",
          "--rounded-box": "1.25rem",
          "--rounded-btn": "0.75rem",
        },
      },
    ],
  },
};
