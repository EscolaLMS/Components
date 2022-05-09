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
    background: rgba(${chroma("#4a4a4a").rgb().join(",")}, 0.2);
    ${(props) => {
      if (props.invert) {
        return `color: ${props.theme.white};`;
      }
    }}
    &,
    &:hover,
    &:focus,
    &:active {
      border: 2px solid rgba(0, 0, 0, 0);
      box-shadow: none !important;
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
    box-shadow: 0px 0px 10px
      rgba(
        ${(props) =>
          props.theme && props.theme.primaryColor
            ? chroma(props.theme.primaryColor).rgb().join(",") || "0, 0, 0"
            : "0, 0, 0"},
        0.5
      );
    ${(props) => {
      if (props.mode === "outline" || props.invert) {
        return "box-shadow:none;";
      }
    }};
    ${(props) => {
      if (!props.invert && props.mode === "outline") {
        return `background: ${props.theme.primaryColor}; color: ${props.theme.white}`;
      }
    }}
    ${(props) => {
      if (props.invert && props.mode === "outline") {
        return `background: ${props.theme.white};
                color: ${props.theme.gray1};
                text-decoration:none`;
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
