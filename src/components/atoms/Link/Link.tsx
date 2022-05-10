import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

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

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: ${(props) =>
      (props.theme.mode === "light"
        ? props.theme?.gray1
        : props.theme?.gray5) || "black"};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover,
  &:active {
    &:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;

export const Link: React.FC<LinkProps> = (props) => {
  return <StyledAnchor {...props}>{props.children}</StyledAnchor>;
};

const NewButton = styled(Link)``;

export default withTheme(NewButton);
