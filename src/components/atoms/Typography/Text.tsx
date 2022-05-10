import * as React from "react";

import styled, { withTheme } from "styled-components";

import { getFontFromTheme } from "../../../theme/provider";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  noMargin?: boolean;
}

const StyledP = styled.p<TitleProps>`
  margin: ${(props) => (props.noMargin ? "0" : "0 0 1.55em 0")};
  padding: 0;
  color: ${(props) =>
    props.theme.mode !== "light" ? props.theme.white : "#111"};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: normal;
  font-size: 16px;
  line-height: 1.55em;
`;

export const Text: React.FC<TitleProps> = (props) => {
  const { children, noMargin, style } = props;
  return (
    <StyledP style={style} noMargin={noMargin} {...props}>
      {children}
    </StyledP>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewText = styled(Text)``;

// Main button with styles
export default withTheme(NewText);
