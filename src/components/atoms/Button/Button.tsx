import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { default as chroma } from "chroma-js";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  mode?: "primary" | "secondary" | "outline";
  invert?: boolean;
}

const StyledButton = styled("button")<ButtonProps>`
  background: ${(props) => {
    if (props.mode === "outline") {
      return "transparent";
    }
    if (props.invert) {
      return props.theme.invertColor;
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
    if (props.mode === "outline") {
      return props.theme.primaryColor;
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
        default:
          return "14px";
      }
    }
    return "18px";
  }};
  line-height: 1.55em;
  cursor: pointer;
  padding: ${(props) =>
    props.mode === "primary" ? "0.75em 2em" : "0.65em 1.3em"};
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
    return props.theme?.primaryColor || "black";
  }};
  transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in,
    background 0.2s ease-in, color 0.2s ease-in;

  &:disabled {
    cursor: not-allowed;
    border-color: transparent;
    ${(props) => {
      if (props.theme.gray1) {
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
        if (props.theme.gray1) {
          return `background: rgba(${chroma(props.theme.gray1)
            .rgb()
            .join(",")}, 0.2);`;
        }
      }}
      color: ${(props) => props.theme.white}
    }
  }

  &:focus,
  &:active {
    border-style: solid;
    border-width: 2px;
    border-color: ${(props) => {
      if (props.invert && props.mode !== "outline") {
        return props.theme.gray1;
      }
      return props.theme.white;
    }};
    box-shadow: none !important;
  }

  &:hover {
    color: ${(props) => props.theme.primaryColor};
    border-color: transparent;
    ${(props) => {
      if (props.theme.primaryColor) {
        if (props.invert) {
          return `
            background: ${chroma(props.theme.invertColor).alpha(0.3).hex()};
            color: ${props.theme.invertColor};
            text-decoration:none;
          `;
        } else {
          return `
            background: ${chroma(props.theme.primaryColor).alpha(0.3).hex()};
          `;
        }
      }
    }}
  }
`;

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, mode = "primary", invert } = props;
  return (
    <StyledButton invert={invert} mode={mode} {...props}>
      {children}
    </StyledButton>
  );
};

const NewButton = styled(Button)<{ mode: string }>``;

export default withTheme(NewButton);
