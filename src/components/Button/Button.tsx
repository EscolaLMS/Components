import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../theme/provider";
import { default as chroma } from "chroma-js";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  mode?: "primary" | "secondary" | "outline";
}

// Main button with styles
const StyledButton = styled("button")<ButtonProps>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => {
    if (props.mode === "outline") {
      return "transparent";
    }
    return props.theme?.primaryColor || "black";
  }};
  color: ${(props) => (props.mode === "outline" ? "#4A4A4A" : "#fff")};
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
  border: none;
  padding: ${(props) =>
    props.mode === "primary" ? "0.75em 2em" : "0.65em 1.3em"};
  border-radius: ${(props) => props.theme?.buttonRadius || 2}px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: 2px solid
    ${(props) => {
      if (props.mode === "outline") {
        return "transparent";
      }
      return props.theme?.primaryColor || "black";
    }};
  transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in;

  &:disabled {
    cursor: not-allowed;
    background: rgba(${chroma("#4a4a4a").rgb().join(",")}, 0.2);
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
    border: 2px solid #fff;
    box-shadow: none !important;
    ${(props) => {
      if (props.mode === "outline") {
        return "border: 2px solid #4A4A4A;";
      }
      return "";
    }};
  }

  &:hover {
    box-shadow: 0px 0px 10px
      rgba(
        ${(props) =>
          chroma(props.theme?.primaryColor).rgb().join(",") || "0, 0, 0"},
        0.5
      );
    ${(props) => {
      if (props.mode === "outline") {
        return `box-shadow:none;
        text-decoration:underline;
        `;
      }
      return "";
    }};
  }
`;

// Main button with styles
export const Button: React.FC<ButtonProps> = ({
  children,
  mode = "primary",
  ...props
}) => {
  return (
    <StyledButton mode={mode} {...props}>
      {children}
    </StyledButton>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewButton = styled(Button)<{ mode: string }>``;

// Main button with styles
export default withTheme(NewButton);
