import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider, ThemeContext } from "styled-components";
import { GlobalThemeProvider } from "../theme/provider";
import { default as chroma } from "chroma-js";
import { useLocalTheme } from "./useLocalTheme";
import themes from "../theme";
import { guid } from "./../utils/utils";
//import axe from "@axe-core/react";
import axeCore from "axe-core";
import Spin from "../components/atoms/Spin/Spin";
import Badge from "../components/atoms/Badge/Badge";

type Mode = ("light" | "dark")[];

const modes: Mode = ["light", "dark"];

export interface ThemeTesterWrapperProps {
  name: string;
  mode?: "light" | "dark";
  childrenListStyle?: React.CSSProperties;
  children?: React.ReactNode;
  flexDirection?: React.CSSProperties["flexDirection"];
  alignItems?: React.CSSProperties["alignItems"];
}

const StyledDiv = styled.div<{
  mode?: "light" | "dark";
  flexDirection?: React.CSSProperties["flexDirection"];
  alignItems?: React.CSSProperties["alignItems"];
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
  padding: 0 0 0 0;
  border-radius: 6px;

  .children-list {
    padding: 10px 25px 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) => props.flexDirection || "row"};
    align-items: ${(props) => props.alignItems || "center"};
    gap: 20px;
    margin-bottom: 10px;
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
  .axe-a11y {
    position: relative;
    background: ${(props) =>
      props.mode === "dark"
        ? chroma(props.theme.backgroundDark).brighten(0.5).hex()
        : chroma(props.theme.backgroundLight).darken(0.5).hex()};

    border-radius: 0 0 6px 6px;
    padding: 10px 15px;
    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
    }
    .button {
      display: flex;
      justify-content: flex-end;
      button {
        -webkit-appearance: none;
        padding: 4px;
        border: none;
        cursor: pointer;
        background: none;
        color: ${(props) =>
          props.mode === "dark"
            ? props.theme.textColorDark
            : props.theme.textColorLight};
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 0px solid purple;
      &,
      a {
        color: ${(props) =>
          props.mode === "dark"
            ? props.theme.textColorDark
            : props.theme.textColorLight};
      }

      td,
      th {
        padding: 3px;
        text-align: left;
        div.wellms-component {
          padding: 0 2px;
        }
        > ul {
          margin: 0;
          padding: 0;
        }
      }
      tr {
        border-top: solid 1px
          ${(props) =>
            props.mode !== "dark"
              ? props.theme.backgroundDark
              : props.theme.backgroundLight};
      }
      td.id,
      td.impact,
      td.tags {
        width: 10%;
      }
      td.help {
        width: 30%;
      }
      td.description {
        width: 40%;
      }
      td.impact {
        .critical > div {
          background: red;
        }
      }
    }
  }
`;

const ThemeTesterWrapper: React.FC<ThemeTesterWrapperProps> = (props) => {
  const theme = React.useContext(ThemeContext);
  const {
    children,
    name,
    childrenListStyle,
    mode = theme.mode,
    flexDirection,
    alignItems,
  } = props;

  const [axeViolations, setAxeViolations] = useState<axeCore.Result[]>();
  const [axeLoading, setAxeLoading] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const a11yTest = useCallback(() => {
    if (ref.current) {
      setAxeLoading(true);
      axeCore
        .run(ref.current)
        .then((results) => {
          if (results.violations.length > 0) {
            console.table(results.violations);
          }
          setAxeViolations(results.violations);
        })
        .catch((err) => {
          console.error("Something bad happened:", err, Object.keys(err));
        })
        .finally(() => setAxeLoading(false));
    }
  }, [ref]);

  useEffect(() => {
    // a11yTest();
  }, [ref]);

  return (
    <StyledDiv
      mode={mode}
      flexDirection={flexDirection}
      alignItems={alignItems}
    >
      <p className="children-list-title">
        <span>
          Theme <strong>{name}</strong>
        </span>{" "}
        <span>
          Mode <strong>{mode}</strong>
        </span>
      </p>
      <div className="children-list" style={childrenListStyle} ref={ref}>
        {children}
      </div>
      <div className="axe-a11y">
        <div className="button">
          {axeLoading && <Spin />}
          <button disabled={axeLoading} onClick={() => a11yTest()}>
            Run a11y tests with axe
          </button>
        </div>

        {axeViolations && axeViolations.length === 0 && (
          <p>Congratulations! No a11y violations found.</p>
        )}

        {!axeLoading && axeViolations && axeViolations.length > 0 && (
          <table>
            <thead>
              <tr>
                <th className="id">id</th>
                <th className="impact">impact</th>
                <th className="tags">tags</th>
                <th className="help">help</th>
                <th className="description">description</th>
              </tr>
            </thead>
            <tbody>
              {axeViolations &&
                axeViolations.map((v) => (
                  <tr key={v.id}>
                    <td className="id">
                      <span>{v.id}</span>
                    </td>
                    <td className="impact">
                      <span className={v.impact?.toString()}>
                        <Badge>{v.impact}</Badge>
                      </span>
                    </td>
                    <td className="tags">
                      <ul>
                        {v.tags.map((tag) => (
                          <li key={tag}>
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="help">
                      <a target="_blank" href={v.helpUrl}>
                        {v.help}
                      </a>
                    </td>
                    <td className="description">{v.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </StyledDiv>
  );
};

interface ThemeTesterProps {
  children?: React.ReactNode;
  childrenListStyle?: React.CSSProperties;
  flexDirection?: React.CSSProperties["flexDirection"];
  alignItems?: React.CSSProperties["alignItems"];
}

export const ThemeTester: React.FC<ThemeTesterProps> = (props) => {
  const { children, childrenListStyle, flexDirection, alignItems } = props;
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
                flexDirection={flexDirection}
                alignItems={alignItems}
                name={theme[0].split("Theme").join("")}
                mode={mode}
                childrenListStyle={childrenListStyle}
              >
                {children}
              </ThemeTesterWrapper>
            </ThemeProvider>
          ))
        )}
      {localTheme.theme !== "all" && localTheme.theme !== "custom" && (
        <ThemeProvider theme={{ ...localTheme }}>
          <ThemeTesterWrapper
            flexDirection={flexDirection}
            alignItems={alignItems}
            name={localTheme.theme?.split("Theme").join("") || ""}
            mode={localTheme.mode}
            childrenListStyle={childrenListStyle}
          >
            {children}
          </ThemeTesterWrapper>
        </ThemeProvider>
      )}
      {localTheme.theme === "custom" && (
        <GlobalThemeProvider>
          <ThemeTesterWrapper
            name={"Custom"}
            alignItems={alignItems}
            childrenListStyle={childrenListStyle}
            flexDirection={flexDirection}
          >
            {children}
          </ThemeTesterWrapper>
        </GlobalThemeProvider>
      )}
    </div>
  );
};

export default ThemeTester;
