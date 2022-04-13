import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../theme/provider";
import { default as chroma } from "chroma-js";

export interface ButtonProps {
  // extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: "primary" | "secondary";
}

const StyledButton = styled("button")<ButtonProps>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => props.theme?.primaryColor || "black"};
  color: #fff;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => (props.size === "primary" ? "18px" : "14px")};
  line-height: 1.55em;
  cursor: pointer;
  border: none;
  padding: 0.75em 2em;
  border-radius: 3px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: 2px solid ${(props) => props.theme?.primaryColor || "black"};
  transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in;
  &:focus,
  &:active {
    border: 2px solid #fff;
    box-shadow: none !important;
  }

  &:hover {
    box-shadow: 0px 0px 10px
      rgba(
        ${(props) =>
          chroma(props.theme?.primaryColor).rgb().join(",") || "0, 0, 0"},
        0.5
      );
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "primary",
}) => {
  return <StyledButton size={size}>{children}</StyledButton>;
};

// https://styled-components.com/docs/api#using-custom-props
const NewButton = styled(Button)<{ size: string }>`
  color: ${(props) => props.size};
`;

export default withTheme(NewButton);
