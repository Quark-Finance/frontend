'use client'

import setGlobalColorTheme from "@/lib/themeColors";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("themeColor") as ThemeColors) || "Zinc";
    }
    return "Zinc" as ThemeColors;
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>("Zinc" as ThemeColors);
  const { theme } = useTheme();

  useEffect(() => {
    const savedColor = getSavedThemeColor();
    setThemeColor(savedColor);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeColor", themeColor);
    }
    setGlobalColorTheme(theme as "light" | "dark", themeColor);
  }, [themeColor, theme]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
