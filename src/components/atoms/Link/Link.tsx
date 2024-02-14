import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { PropsWithChildren } from "react";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ExtendableStyledComponent {
  underline?: boolean;
}

// Main button with styles
const StyledAnchor = styled("a")<LinkProps>`
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.gray5, theme.gray1, "black")};
  font-family: ${(props) =>
    props.theme ? getFontFromTheme(props.theme).fontFamily : "sans-serif"};
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55em;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  text-decoration: none;
  display: inline-block;
  position: relative;

  & > * {
    vertical-align: middle;
  }
  & > svg {
    margin: 0 0.5em;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: ${(props) => (props.underline ? "scaleX(1)" : "scaleX(0)")};
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.gray5, theme.gray1, "black")};
    transform-origin: ${(props) =>
      props.underline ? "bottom left" : "bottom right"};
    transition: transform 0.25s ease-out;
  }

  &:hover,
  &:active {
    &:after {
      transform: ${(props) => (props.underline ? "scaleX(0)" : "scaleX(1)")};
      transform-origin: bottom left;
    }
  }
`;

export const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  underline = false,
  ...props
}) => {
  return (
    <StyledAnchor
      underline={underline}
      {...props}
      className={`wellms-component ${props.className ?? ""}`}
    >
      {props.children}
    </StyledAnchor>
  );
};

export default withTheme(styled(Link)``);
