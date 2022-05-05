import React from "react";

import styled, { ThemeProvider, ThemeContext } from "styled-components";
import { GlobalThemeProvider } from "../theme/provider";
import { default as chroma } from "chroma-js";
import { useLocalTheme } from "./useLocalTheme";
import themes from "../theme";

type Mode = ("light" | "dark")[];

type Layout = "row" | "column";

const modes: Mode = ["light", "dark"];

const StyledDiv = styled.div<{
  mode?: "light" | "dark";
  layout?: Layout;
}>`
  background: ${(props) =>
    props.mode === "dark"
      ? props.theme.backgroundDark
      : props.theme.backgroundLight};
  color: ${(props) =>
    props.mode === "dark"
      ? props.theme.textColorDark
      : props.theme.textColorLight};

  font-family: "Inter", sans-serif;
  margin: 10px 0;
  font-size: 12px;
  position: relative;
  padding: 0 0 25px 0;
  border-radius: 6px;

  .children-list {
    padding: 10px 25px 0;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: ${(props) => (props.layout === "column" ? "flex-start" : "center")};
    flex-direction: ${(props) => props.layout};
    
  }
  .children-list-title {
    background: ${(props) =>
      props.mode === "dark"
        ? chroma(props.theme.backgroundDark).brighten(0.5).hex()
        : chroma(props.theme.backgroundLight).darken(0.5).hex()};
    padding: 10px 15px;
    border-radius: 6px 6px 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    strong {
      text-transform: uppercase;
    }
  }
`;

const ThemeTesterWrapper: React.FC<{
  name: string;
  mode?: "light" | "dark";
  children?: React.ReactNode;
  layout?: Layout;
}> = ({ children, name, mode, layout = "row" }) => {
  const theme = React.useContext(ThemeContext);

  if (mode === undefined) {
    mode = theme.mode;
  }

  return (
    <StyledDiv mode={mode} layout={layout}>
      <p className="children-list-title">
        <span>
          Theme <strong>{name}</strong>
        </span>{" "}
        <span>
          Mode <strong>{mode}</strong>
        </span>
      </p>
      <div className="children-list">{children}</div>
    </StyledDiv>
  );
};

export const ThemeTester: React.FC<{
  children?: React.ReactNode;
  layout?: Layout;
}> = ({ children, layout }) => {
  const [localTheme] = useLocalTheme();

  return (
    <div>
      {localTheme.theme === "all" &&
        Object.entries(themes).map((theme) =>
          modes.map((mode) => (
            <ThemeProvider
              theme={{ ...theme[1], mode }}
              key={`${theme[0]}${mode}`}
            >
              <ThemeTesterWrapper
                name={theme[0].split("Theme").join("")}
                mode={mode}
                layout={layout}
              >
                {children}
              </ThemeTesterWrapper>
            </ThemeProvider>
          ))
        )}
      {localTheme.theme !== "all" && localTheme.theme !== "custom" && (
        <ThemeProvider theme={{ ...localTheme }}>
          <ThemeTesterWrapper
            name={localTheme.theme?.split("Theme").join("") || ""}
            mode={localTheme.mode}
            layout={layout}
          >
            {children}
          </ThemeTesterWrapper>
        </ThemeProvider>
      )}
      {localTheme.theme === "custom" && (
        <GlobalThemeProvider>
          <ThemeTesterWrapper name={"Custom"}>{children}</ThemeTesterWrapper>
        </GlobalThemeProvider>
      )}
    </div>
  );
};

export default ThemeTester;
