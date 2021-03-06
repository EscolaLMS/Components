import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { default as chroma } from "chroma-js";
import { PropsWithChildren } from "react";

import Spin from "../Spin/Spin";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  mode?: "primary" | "secondary" | "outline" | "white" | "icon";
  invert?: boolean;
  loading?: boolean;
  block?: boolean;
}

const StyledButton = styled("button")<ButtonProps>`
  background: ${(props) => {
    if (props.mode === "outline") {
      return "transparent";
    }
    if (props.invert) {
      return props.theme.invertColor;
    }
    if (props.mode === "white") {
      return props.theme.white;
    }
    if (props.mode === "icon") {
      return "transparent";
    }
    return props.theme?.primaryColor || "black";
  }};
  color: ${(props) => {
    if (props.mode === "outline" && props.invert) {
      return props.theme.white;
    }
    if (props.invert) {
      return props.theme.gray1;
    }
    if (props.mode === "outline" && props.theme.mode === "light") {
      return props.theme.gray1;
    }
    if (props.mode === "white") {
      return props.theme.gray1;
    }
    if (props.mode === "icon") {
      return props.theme.mode === "light"
        ? props.theme.gray1
        : props.theme.white;
    }
    return props.theme.white;
  }};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => {
    if (props.mode) {
      switch (props.mode) {
        case "primary":
          return "18px";
        case "secondary":
        case "outline":
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
  padding: ${(props) => {
    if (props.mode === "primary") {
      return "0.75em 2em";
    } else if (props.mode === "icon") {
      return "4px";
    }
    return "0.65em 1.3em";
  }};
  border-radius: ${(props) => props.theme?.buttonRadius || 2}px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
  border-color: ${(props) => {
    if (props.invert && props.mode === "outline") {
      return props.theme.white;
    }
    if (props.invert) {
      return props.theme.invertColor;
    }
    if (props.mode === "outline") {
      return props.theme.mode === "light"
        ? props.theme.gray1
        : props.theme.white;
    }
    if (props.mode === "white") {
      return props.theme.white;
    }
    if (props.mode === "icon") {
      return "transparent";
    }
    return props.theme?.primaryColor || "black";
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
            return "18px";
          case "secondary":
          case "outline":
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
    box-shadow: none !important;
  }

  &:hover {
    color: ${(props) => {
      if (props.mode !== "icon") {
        return props.theme.primaryColor;
      }
    }};
    border-color: transparent;
    ${(props) => {
      if (props.theme) {
        if (props.invert) {
          if (props.mode === "outline") {
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
          if (props.mode === "outline") {
            return `
              background: ${
                props.theme.mode !== "dark"
                  ? props.theme.black
                  : props.theme.white
              };
              color: ${
                props.theme.mode !== "dark"
                  ? props.theme.white
                  : props.theme.black
              };
            `;
          }
          return `
            background: ${chroma(props.theme.primaryColor).alpha(0.3).hex()};
          `;
        }
      }
    }}
  }

  &:disabled {
    cursor: not-allowed;
    border-color: transparent;
    ${(props) => {
      if (props.theme) {
        return `background: rgba(${chroma(props.theme.gray1)
          .rgb()
          .join(",")}, 0.2);`;
      }
    }}
    ${(props) => {
      if (props.invert) {
        return `color: ${props.theme.white};`;
      }
    }}
    &,
    &:hover,
    &:focus,
    &:active {
      ${(props) => {
        if (props.theme) {
          return `background: rgba(${chroma(props.theme.gray1)
            .rgb()
            .join(",")}, 0.2);`;
        }
      }}
      color: ${(props) => props.theme.white}
    }
  }
`;

// Main button with styles
export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  mode = "primary",
  invert,
  loading = false,
  block = false,
  ...props
}) => {
  const theme = React.useContext(ThemeContext);

  const loadingColor = React.useMemo(() => {
    if ((theme && theme.mode === "light" && mode === "outline") || invert) {
      return theme.gray1;
    }
    return theme.white || "#fff";
  }, [mode, theme]);
  return (
    <StyledButton
      invert={invert}
      mode={mode}
      loading={loading}
      block={block}
      {...props}
    >
      {loading && <Spin color={loadingColor} />}
      {children}
    </StyledButton>
  );
};

export default withTheme(styled(Button)<{ mode: string }>``);
