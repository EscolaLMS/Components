import * as React from "react";

import styled, { withTheme } from "styled-components";

import { getFontFromTheme } from "../../../theme/provider";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

const StyledP = styled.p<TitleProps>`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.headerColor || "#111"};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: normal;
  font-size: 16px;
  line-height: 1.55em;
  margin-bottom: 1.55em;
`;

export const Text: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return <StyledP>{children}</StyledP>;
};

// https://styled-components.com/docs/api#using-custom-props
const NewText = styled(Text)<{}>``;

// Main button with styles
export default withTheme(NewText);
