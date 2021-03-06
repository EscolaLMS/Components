import { useCallback, useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";

import { orangeTheme as defaultTheme } from "../theme/orange";

export const getThemeFromLocalStorage = (
  theme: DefaultTheme = defaultTheme
): DefaultTheme => {
  if (
    window.localStorage.getItem("theme") !== null &&
    typeof window.localStorage.getItem("theme") === "string"
  ) {
    let theme: Required<DefaultTheme>;
    try {
      theme = {
        mode: "light",
        theme: "all",
        ...defaultTheme,
        ...JSON.parse(window.localStorage.getItem("theme") || ""),
      };
    } catch (err) {
      return defaultTheme;
    }
    return theme;
  }
  return theme;
};

export const setThemeToLocalStorage = (
  theme: DefaultTheme = defaultTheme
): void => {
  window.localStorage.setItem("theme", JSON.stringify(theme));
  window.dispatchEvent(new Event("themeChange"));
};

// Hook
export function useLocalTheme(
  initialValue: DefaultTheme = defaultTheme
): [DefaultTheme, (value: DefaultTheme) => void] {
  const [localTheme, setLocalTheme] = useState<DefaultTheme>(
    getThemeFromLocalStorage(initialValue)
  );

  const setTheme = useCallback((theme: DefaultTheme) => {
    setThemeToLocalStorage(theme);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const listener = () => {
        const value = getThemeFromLocalStorage(initialValue);
        setLocalTheme(value);
      };
      window.addEventListener("themeChange", listener);
      window.addEventListener("storage", listener);

      return () => {
        window.removeEventListener("themeChange", listener);
        window.removeEventListener("storage", listener);
      };
    }
  }, []);

  return [localTheme, setTheme];
}
