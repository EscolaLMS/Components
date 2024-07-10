import { useCallback, useEffect, useState } from "react";
import { DefaultTheme } from "styled-components";

import { orangeTheme as defaultTheme } from "../theme/orange";
import themes from "../theme";

export const getThemeFromLocalStorage = (
  theme: DefaultTheme = defaultTheme
): DefaultTheme => {
  if (
    window.localStorage.getItem("theme") !== null &&
    typeof window.localStorage.getItem("theme") === "string"
  ) {
    try {
      theme = {
        mode: "light",
        theme: Object.keys(themes).includes(window.location.hash.substr(1))
          ? window.location.hash.substr(1)
          : "all",
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
    getThemeFromLocalStorage(
      Object.keys(themes).includes(window.location.hash.substr(1))
        ? {
            ...(themes[window.location.hash.substr(1)] as DefaultTheme),
            theme: window.location.hash.substr(1),
          }
        : initialValue
    )
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
