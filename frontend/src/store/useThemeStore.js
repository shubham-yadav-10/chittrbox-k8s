import { create } from "zustand";
import { THEMES } from "../constants";

const DEFAULT_THEME = "aurora";

const getInitialTheme = () => {
  const stored = localStorage.getItem("chat-theme");
  // Guard against stale themes from older versions that no longer exist
  return stored && THEMES.includes(stored) ? stored : DEFAULT_THEME;
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
