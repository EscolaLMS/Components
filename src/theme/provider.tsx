import { DefaultTheme, ThemeProvider } from "styled-components";

import React, { useState, useEffect, useCallback } from "react";

import { orangeTheme as defaultTheme } from "./orange";
import { useLocalTheme } from "../styleguide/useLocalTheme";

export interface SharedDefaultTheme {
  theme?: string;
  backgroundLight: string;
  backgroundDark: string;
  buttonRadius?: number;
  inputRadius?: number;
  checkboxRadius?: number;
  white: string;
  gray5: string;
  gray4: string;
  gray3: string;
  gray2: string;
  gray1: string;
  black: string;
  backgroundDarkProgress: string;
  errorColor: string;
}

declare module "styled-components" {
  export interface DefaultTheme extends SharedDefaultTheme {
    mode?: "light" | "dark";
    textColorLight: string;
    textColorDark: string;
    primaryColor: string;
    secondaryColor?: string;
    radius?: number;
    font: "Inter" | "Mulish" | "Titillium";
    headerColor?: string;
  }
}

export const Fonts: Record<
  DefaultTheme["font"],
  { links: string[]; fontFamily: string }
> = {
  Inter: {
    links: [
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
    ],
    fontFamily: "'Inter', sans-serif;",
  },
  Mulish: {
    links: [
      "https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;700&display=swap",
    ],
    fontFamily: "'Mulish', sans-serif;",
  },
  Titillium: {
    links: [
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap",
    ],
    fontFamily: "'Titillium Web', sans-serif;",
  },
};

export const getFontFromTheme = (
  theme?: DefaultTheme
): { links: string[]; fontFamily: string } => {
  if (theme && theme.font && Fonts[theme.font]) {
    return Fonts[theme.font];
  }
  return {
    fontFamily: "sans-serif",
    links: [],
  };
};

export const GlobalThemeProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [theme] = useLocalTheme();
  const font = Fonts[theme.font];

  return (
    <ThemeProvider theme={theme}>
      {font &&
        font.links.map((link) => (
          <link key={link} rel="stylesheet" href={link} />
        ))}
      {children}
    </ThemeProvider>
  );
};
