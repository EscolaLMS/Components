import { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";

import themes from "../theme";
import { getFontFromTheme, getThemeFromLocalStorage } from "../theme/provider";
import { orangeTheme as defaultTheme } from "../theme/orange";

type Theme = "all" | "custom" | keyof typeof themes;

// Hook
export function useLocalTheme(initialValue: DefaultTheme = defaultTheme) {
  const [theme, setTheme] = useState<DefaultTheme>(
    getThemeFromLocalStorage(initialValue)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const listener = () => {
        const value = getThemeFromLocalStorage(initialValue);
        setTheme(value);
      };
      window.addEventListener("themeChange", listener);
      window.addEventListener("storage", listener);

      return () => {
        window.removeEventListener("themeChange", listener);
        window.removeEventListener("storage", listener);
      };
    }
  }, [theme]);

  return theme;
}
