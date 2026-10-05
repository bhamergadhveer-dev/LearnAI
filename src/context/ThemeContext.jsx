import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Theme system for the whole app.
 *
 * Supports three modes: "light" | "dark" | "system".
 * The resolved theme is applied as a `dark` class on <html>, which every
 * component picks up automatically because all colors are semantic tokens
 * defined for both palettes in src/styles.css.
 */
const STORAGE_KEY = "learnai-theme";

const ThemeContext = createContext(null);

/** Reads the OS preference (safe during SSR). */
function systemTheme() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Applies the resolved theme to the document element. */
function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }) {
  // "system" by default; the real value is restored after hydration.
  const [theme, setThemeState] = useState("system");
  const [resolved, setResolved] = useState("dark");

  // Restore the stored preference once on the client.
  useEffect(() => {
    const stored =
      typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const next = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setThemeState(next);
  }, []);

  // Resolve + apply whenever the preference changes, and follow the OS in
  // "system" mode.
  useEffect(() => {
    const compute = () => {
      const next = theme === "system" ? systemTheme() : theme;
      setResolved(next);
      applyTheme(next);
    };
    compute();
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", compute);
    return () => mq.removeEventListener("change", compute);
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Access the current theme mode and setter. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  // Fall back to a no-op so components never crash outside the provider.
  return ctx ?? { theme: "system", resolvedTheme: "dark", setTheme: () => {} };
}
