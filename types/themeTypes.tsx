type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange" | "Pink";

interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>
}