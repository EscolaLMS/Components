import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { default as chroma } from "chroma-js";
import { PropsWithChildren } from "react";

import Spin from "../Spin/Spin";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ExtendableStyledComponent {
  children?: React.ReactNode;
  invert?: boolean;
  loading?: boolean;
  block?: boolean;
  mode?:
    | "primary"
    | "secondary"
    | "outline"
    | "white"
    | "icon"
    | "secondary outline";
  as?: React.ElementType;
  "aria-label"?: string;
}

const StyledButton = styled("button")<ButtonProps>`
  background: ${({ mode, theme, invert }) => {
    if (mode && mode.includes("outline")) {
      return "transparent";
    }
    if (invert) {
      return theme.invertColor;
    }
    if (mode === "white") {
      return theme.white;
    }
    if (mode === "icon") {
      return "transparent";
    }
    return theme?.primaryColor || "black";
  }};
  color: ${({ theme, mode, invert }) => {
    if ((mode && mode.includes("outline")) || mode === "icon") {
      if (invert) {
        return getStylesBasedOnTheme(
          theme.mode,
          theme.dm__outlineButtonInvertColor,
          theme.outlineButtonInvertColor,
          theme.textColor
        );
      }
      return getStylesBasedOnTheme(
        theme.mode,
        theme.dm__outlineButtonColor,
        theme.textColor,
        theme.textColor
      );
    }

    if (mode === "white") {
      return theme.black;
    }

    return theme.white;
  }};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => {
    if (props.mode) {
      switch (props.mode) {
        case "primary":
        case "secondary":
        case "outline":
        case "secondary outline":
          return "16px";

        case "white":
        default:
          return "14px";
      }
    }
    return "18px";
  }};
  line-height: ${(props) => {
    if (props.mode === "icon") {
      return "1.5";
    }
    return "1.55em";
  }};
  cursor: pointer;
  padding: "9xp 16px";
  padding: ${(props) => {
    if (props.mode === "icon") {
      return "4px";
    } else if (
      props.mode === "secondary" ||
      props.mode === "secondary outline"
    ) {
      return "4px 13px";
    }
    return "9px 16px";
  }};
  border-radius: ${(props) => props.theme?.buttonRadius || 2}px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme, mode, invert }) => {
    if (mode?.includes("outline")) {
      if (invert) {
        return getStylesBasedOnTheme(
          theme.mode,
          theme.dm__outlineButtonInvertColor,
          theme.outlineButtonInvertColor,
          theme.primaryColor
        );
      }
      return getStylesBasedOnTheme(
        theme.mode,
        theme.dm__outlineButtonColor,
        theme.outlineButtonColor,
        theme.primaryColor
      );
    }

    return "transparent";
  }};
  transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in,
    background 0.2s ease-in, color 0.2s ease-in, opacity 0.2s ease-in;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;

  ${(props) => (props.block ? "width:100%;" : "")}

  pointer-events: ${(props) => {
    if (props.loading) {
      return "none";
    }
    return "auto";
  }};

  & > svg {
    margin: ${(props) => {
      if (props.mode === "icon") {
        return "0";
      }
      return "0 9px";
    }};
    height: ${(props) => {
      if (props.mode) {
        switch (props.mode) {
          case "primary":
          case "secondary":
          case "outline":
          case "secondary outline":
            return "18px";

          default:
            return "14px";
        }
      }
      return "18px";
    }};
    width: ${(props) => {
      if (props.mode === "icon") {
        return "14px";
      }
      return "18px";
    }};
  }

  &:focus,
  &:active {
    border-style: solid;
    border-width: 2px;
    border-color: ${(props) => {
      if (props.invert && props.mode !== "outline") {
        return props.theme.gray1;
      } else if (props.mode === "icon") {
        return "transparent";
      }
      return props.theme.white;
    }};
  }

  &:hover {
    color: ${(props) => {
      if (props.mode !== "icon") {
        return props.theme.primaryColor;
      }
    }};
    border: ${(props) => {
      if (props.mode && props.mode.includes("outline")) {
        return `2px solid ${chroma(props.theme.primaryColor).alpha(0.4).hex()}`;
      }
    }};

    ${(props) => {
      if (props.theme) {
        if (props.invert) {
          if (props.mode && props.mode.includes("outline")) {
            return `
              background: ${props.theme.white};
              color: ${props.theme.gray1};
            `;
          }
          return `
            background: ${chroma(props.theme.invertColor).alpha(0.3).hex()};
            color: ${props.theme.invertColor};
            text-decoration:none;
          `;
        } else if (props.mode === "white") {
          return `
            background: ${chroma(props.theme.white).alpha(0.85).hex()};
            color: ${props.theme.gray1};
          `;
        } else if (props.mode === "icon") {
          return `
            background: transparent;
            opacity: 0.6;
            `;
        } else {
          if (props.mode && props.mode.includes("outline")) {
            return `
              background: ${getStylesBasedOnTheme(
                props.theme.mode,
                props.theme.white,
                "transparent"
              )};
              color: ${getStylesBasedOnTheme(
                props.theme.mode,
                props.theme.black,
                props.theme.textColor
              )};
            `;
          }
          return `
            color: ${chroma(props.theme.white).alpha(0.85).hex()};
            background: ${chroma(props.theme.primaryColor).alpha(0.85).hex()};
          `;
        }
      }
    }};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: transparent;
    background-color: ${({ theme }) => {
      if (theme) {
        return getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryButtonDisabled,
          theme.primaryButtonDisabled,
          `rgba(${chroma(theme.gray1).rgb().join(",")}, 0.2)`
        );
      }
    }};
    ${(props) => {
      if (props.invert) {
        return `color: ${props.theme.white};`;
      }
      if (props.mode && props.mode.includes("outline")) {
        return `color: ${props.theme.textColor};
        background: ${props.theme.white};
        border: 1px solid ${props.theme.primaryButtonDisabled};        
        `;
      }
    }};
  }

  &.dropdown {
    all: unset;
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 11px 13px;
    font-size: 13px;
    .profileIcon {
      width: 30px;
      height: 30px;
    }
    &:hover {
      background-color: #f8f8f8;
    }
  }

  /* &:focus,
  &:active {
    ${(props) => {
    if (props.theme) {
      return `background: rgba(${chroma(props.theme.gray1)
        .rgb()
        .join(",")}, 0.2);`;
    }
  }}
    color: ${(props) => props.theme.white}
  } */
`;

// Main button with styles
export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  as,
  children,
  mode = "primary",
  invert,
  loading = false,
  block = false,
  className = "",
  ...props
}) => {
  const theme = React.useContext(ThemeContext);

  const loadingColor = React.useMemo(() => {
    if (mode === "outline") {
      if (invert) {
        return getStylesBasedOnTheme(
          theme.mode,
          theme.dm__outlineButtonInvertColor,
          theme.outlineButtonInvertColor,
          theme.primaryColor
        );
      }
      return getStylesBasedOnTheme(
        theme.mode,
        theme.dm__outlineButtonColor,
        theme.outlineButtonColor,
        theme.primaryColor
      );
    }

    return theme.white || "#fff";
  }, [mode, theme]);
  return (
    <StyledButton
      invert={invert}
      as={as ?? "button"}
      mode={mode}
      loading={loading}
      block={block}
      {...props}
      className={`wellms-component ${className}`}
    >
      {loading && <Spin color={loadingColor} />}
      {children}
    </StyledButton>
  );
};

export default withTheme(styled(Button)<{ mode: string }>``);
