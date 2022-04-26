import React, { useState } from "react";

import { DefaultTheme, ThemeProvider, ThemeContext } from "styled-components";
import { GlobalThemeProvider } from "../theme/provider";

import themes from "../theme";

type Mode = ("light" | "dark")[];

const modes: Mode = ["light", "dark"];

const ThemeTesterWrapper: React.FC<{
  name: string;
  mode: "light" | "dark";
  children?: React.ReactNode;
}> = ({ children, name, mode }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      style={{
        margin: "10px 0",
        position: "relative",
        padding: "1px 15px 25px 15px",
        background:
          mode === "dark" ? theme.backgroundDark : theme.backgroundLight,
        color: mode === "dark" ? theme.textColorDark : theme.textColorLight,
      }}
    >
      <p>
        Theme {name}, mode: {mode}
      </p>
      {children}
    </div>
  );
};

export const ThemeTester: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      {Object.entries(themes).map((theme) =>
        modes.map((mode) => (
          <ThemeProvider theme={{ ...theme[1], mode }} key={theme[0]}>
            <ThemeTesterWrapper
              name={theme[0].split("Theme").join("")}
              mode={mode}
            >
              {children}
            </ThemeTesterWrapper>
          </ThemeProvider>
        ))
      )}
      <GlobalThemeProvider>
        {modes.map((mode) => (
          <ThemeTesterWrapper name={"Custom"} mode={mode}>
            {children}
          </ThemeTesterWrapper>
        ))}
      </GlobalThemeProvider>
    </div>
  );
};

export default ThemeTester;
