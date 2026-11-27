"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "ids-theme";
const THEME_EVENT = "ids-theme-change";

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
}

function subscribeToTheme(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = (event: MediaQueryListEvent) => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        applyThemeClass(event.matches ? "dark" : "light");
        callback();
      }
    } catch {
      // Ignore storage restrictions
    }
  };

  window.addEventListener(THEME_EVENT, callback);
  mediaQuery.addEventListener("change", handleMediaChange);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    mediaQuery.removeEventListener("change", handleMediaChange);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeMounted(): () => void {
  return () => {};
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribeMounted,
    () => true,
    () => false
  );

  const theme = useSyncExternalStore<Theme>(
    subscribeToTheme,
    getThemeSnapshot,
    () => "light"
  );

  const setTheme = (nextTheme: Theme) => {
    applyThemeClass(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, mounted, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
