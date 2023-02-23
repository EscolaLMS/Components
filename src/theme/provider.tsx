import { DefaultTheme, ThemeProvider } from "styled-components";

import React from "react";

import { useLocalTheme } from "../styleguide/useLocalTheme";

export interface SharedDefaultTheme {
  theme?: string;
  background: string;
  dm__background: string;
  cardBackgroundColor: string;
  dm__cardBackgroundColor: string;
  errorColor: string;
  dm__errorColor?: string;
  invertColor: string;

  buttonRadius?: number;
  inputRadius?: number;
  noteRadius?: number;
  checkboxRadius?: number;
  cardRadius?: number;

  white: string;
  gray5: string;
  gray4: string;
  gray3: string;
  gray2: string;
  gray1: string;
  black: string;
}

declare module "styled-components" {
  export interface DefaultTheme
    extends SharedDefaultTheme,
      Record<string, unknown> {
    mode?: "light" | "dark";
    font: "Inter" | "Mulish" | "Titillium";
    radius?: number;
    textColor: string;
    dm__textColor: string;
    primaryColor: string;
    dm__primaryColor?: string;
    dm__primaryColorOnLight?: string;
    secondaryColor?: string;
    dm__secondaryColor?: string;
    headerColor?: string;
    dm__headerColor?: string;
    inputBg?: string;
    dm__inputBg?: string;
    inputDisabledBg?: string;
    dm__inputDisabledBg?: string;
    labelListValueColor?: string;
    dm__labelListValueColor?: string;
    primaryButtonDisabled?: string;
    dm__primaryButtonDisabled?: string;
    outlineButtonColor?: string;
    dm__outlineButtonColor?: string;
    outlineButtonInvertColor?: string;
    dm__outlineButtonInvertColor?: string;
    breadcrumbsColor?: string;
    dm__breadcrumbsColor?: string;
    numerationsColor?: string;
    dm__numerationsColor?: string;
    colorBackground?: string;
    dm__colorBackground?: string;
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

export const GlobalThemeProvider: React.FC<{
  defaultTheme?: DefaultTheme;
  children?: React.ReactNode;
}> = ({ defaultTheme, children }) => {
  const [theme] = useLocalTheme();
  const font = Fonts[theme.font];

  return (
    <ThemeProvider theme={defaultTheme ?? theme}>
      {font &&
        font.links.map((link) => (
          <link key={link} rel="stylesheet" href={link} />
        ))}
      {children}
    </ThemeProvider>
  );
};
