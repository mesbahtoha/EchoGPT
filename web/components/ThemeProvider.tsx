"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "echogpt-theme";
export const THEME_CHANGE_EVENT = "echogpt:theme-change";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "light", setTheme: () => {}, toggle: () => {} });

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {
    /* storage unavailable — fall through to light */
  }
  return "light";
}

/** Single place that applies a theme everywhere: <html> class, storage, and listeners. */
function applyTheme(t: Theme) {
  try {
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t === "dark" ? "dark" : "light";
  } catch {
    /* document unavailable during SSR — effect below re-applies on mount */
  }
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, t);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
  try {
    window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: t }));
  } catch {
    /* event dispatch is best-effort */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
  }, []);

  // Sync from storage/OS on mount (runs before paint, matching the pre-hydration script).
  useEffect(() => {
    setThemeState(getInitialTheme());
    applyTheme(getInitialTheme());
  }, []);

  // Keep every open tab — and every provider instance — in sync.
  // Changing theme on the landing page, in Settings, or in the sidebar
  // updates localStorage, which re-renders all listeners across the site.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
        setThemeState(e.newValue);
        try {
          document.documentElement.classList.toggle("dark", e.newValue === "dark");
          document.documentElement.style.colorScheme = e.newValue === "dark" ? "dark" : "light";
        } catch {
          /* ignore */
        }
      }
    }
    function onCustom(e: Event) {
      const next = (e as CustomEvent<Theme>).detail;
      if (next === "dark" || next === "light") {
        setThemeState(next);
        try {
          document.documentElement.classList.toggle("dark", next === "dark");
          document.documentElement.style.colorScheme = next === "dark" ? "dark" : "light";
        } catch {
          /* ignore */
        }
      }
    }
    // Follow the OS while the user has never picked a theme explicitly.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onOsChange(ev: MediaQueryListEvent) {
      try {
        if (window.localStorage.getItem(THEME_STORAGE_KEY) == null) {
          const next: Theme = ev.matches ? "dark" : "light";
          setThemeState(next);
          document.documentElement.classList.toggle("dark", next === "dark");
        }
      } catch {
        /* ignore */
      }
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(THEME_CHANGE_EVENT, onCustom as EventListener);
    mq.addEventListener?.("change", onOsChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(THEME_CHANGE_EVENT, onCustom as EventListener);
      mq.removeEventListener?.("change", onOsChange);
    };
  }, []);

  const toggle = useCallback(() => {
    setThemeState((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
