import type * as React from "react";
import styled, { withTheme } from "styled-components";
import type { ExtendableStyledComponent } from "types/component";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { getFontFromTheme } from "../../../theme/provider";

export interface LinkProps
  extends React.ButtonHTMLAttributes<HTMLSpanElement>,
    ExtendableStyledComponent {
  children?: React.ReactNode;
}

// Main button with styles
const StyledSpan = styled("span")<{ isButton: boolean }>`
  color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__primaryColor,
      theme.primaryColor,
      "black"
    )};
  font-family: ${(props) =>
    props.theme ? getFontFromTheme(props.theme).fontFamily : "sans-serif"};
  font-weight: 700;
  font-size: 16px;
  line-height: 1.55em;
  cursor: ${(props) => (props.isButton ? "pointer" : "inherit")};
  -webkit-font-smoothing: antialiased;
  text-decoration: none;
  display: inline-block;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        "black"
      )};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover,
  &:active {
    &:after {
      transform: ${(props) => (props.isButton ? "scaleX(1)" : "scaleX(0)")};
      transform-origin: bottom left;
    }
  }
`;

export const Tag: React.FC<LinkProps> = (props) => {
  const isButton = typeof props.onClick === "function";
  return (
    <StyledSpan
      {...props}
      isButton={isButton}
      className={`wellms-component ${props.className ?? ""}`}
    >
      {props.children}
    </StyledSpan>
  );
};

const NewButton = styled(Tag)``;

export default withTheme(NewButton);
