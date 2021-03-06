import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { PropsWithChildren } from "react";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  underline?: boolean;
};

// Main button with styles
const StyledAnchor = styled("a")<LinkProps>`
  color: ${(props) =>
    (props.theme.mode === "light" ? props.theme?.gray1 : props.theme?.gray5) ||
    "black"};
  font-family: ${(props) =>
    props.theme ? getFontFromTheme(props.theme).fontFamily : "sans-serif"};
  font-weight: 500;
  font-size: 14px;
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
    background-color: ${(props) =>
      (props.theme.mode === "light"
        ? props.theme?.gray1
        : props.theme?.gray5) || "black"};
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
    <StyledAnchor underline={underline} {...props}>
      {props.children}
    </StyledAnchor>
  );
};

export default withTheme(styled(Link)``);
