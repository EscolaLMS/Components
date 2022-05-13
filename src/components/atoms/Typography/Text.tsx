import * as React from "react";

import styled, { withTheme } from "styled-components";

import { getFontFromTheme } from "../../../theme/provider";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  noMargin?: boolean;
  bold?: boolean;
  size?: "16" | "14";
  type?: "primary" | "secondary" | "warning" | "danger";
}

const StyledP = styled.p<TextProps>`
  margin: ${(props) => (props.noMargin ? "0" : "0 0 1.55em 0")};
  padding: 0;
  color: ${(props) => {
    switch (props.type) {
      case "danger":
        return "#EB5757";
      case "primary":
      default:
        return props.theme.mode !== "light" ? props.theme.white : "#111";
    }
  }};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-size: ${(props) => (props.size === "14" ? "14px" : "16px")};
  line-height: 1.55em;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Text: React.FC<TextProps> = (props) => {
  const {
    children,
    noMargin,
    style,
    bold,
    size = "16",
    type = "primary",
  } = props;
  return (
    <StyledP
      style={style}
      noMargin={noMargin}
      bold={bold}
      size={size}
      type={type}
      {...props}
    >
      {children}
    </StyledP>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewText = styled(Text)``;

// Main button with styles
export default withTheme(NewText);
