"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SITE_CONFIG } from "@/lib/constants";

// Theme context type
type ThemeContextType = {
  theme: typeof SITE_CONFIG.theme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", (!isDarkMode).toString());

    // Toggle dark class on document
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme from localStorage on client side
  useEffect(() => {
    // Check for saved preference or system preference
    const savedDarkMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial state based on saved preference or system preference
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === "true");
      if (savedDarkMode === "true") {
        document.documentElement.classList.add("dark");
      }
    } else if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Apply CSS variables for theme colors
  useEffect(() => {
    const root = document.documentElement;

    // Set CSS variables for theme colors
    Object.entries(SITE_CONFIG.theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Set font variables
    root.style.setProperty("--font-heading", SITE_CONFIG.theme.fonts.heading);
    root.style.setProperty("--font-body", SITE_CONFIG.theme.fonts.body);
    root.style.setProperty("--font-link", SITE_CONFIG.theme.fonts.link);
  }, []);

  const contextValue = useMemo(
    () => ({
      theme: SITE_CONFIG.theme,
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
