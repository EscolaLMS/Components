import { DefaultTheme, ThemeProvider } from "styled-components";

import React, { useState, useEffect, useCallback } from "react";

import { lightTheme as defaultTheme } from "./light";

declare module "styled-components" {
  export interface DefaultTheme {
    buttonColor: string;
    buttonBackground: string;
    mainColor: string;
    radius?: number;
  }
}

// TODO add https://claus.github.io/react-dat-gui/ to controll theme & colors

export const GlobalThemeProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const onStorage = useCallback(() => {
    if (
      window.localStorage.getItem("theme") !== null &&
      typeof window.localStorage.getItem("theme") === "string"
    ) {
      let theme: Partial<DefaultTheme>;
      try {
        theme = JSON.parse(window.localStorage.getItem("theme") || "");
      } catch (err) {
        return; // stop here
      }
      if (theme) {
        setTheme((prevTheme) => ({
          ...prevTheme,
          ...theme,
        }));
      }
    }
  }, []);
  useEffect(() => {
    onStorage();
    window.addEventListener("storage", onStorage);
    window.addEventListener("themeChange", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("themeChange", onStorage);
    };
  }, [onStorage]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
