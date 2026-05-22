import React, { createContext, useContext, useEffect } from "react";

// Theme toggle is disabled — site is always dark
type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void; // no-op, kept for API compatibility
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    try { localStorage.removeItem("surrah-theme"); } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
