import * as React from "react";

import styled, { withTheme } from "styled-components";

import { getFontFromTheme } from "../../../theme/provider";
import { HeaderLevelInt, HeaderLevelStr } from "../../../types/titleTypes";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  level?: HeaderLevelInt;
  as: keyof JSX.IntrinsicElements;
}

const StyledHeader = styled.h1<TitleProps>`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.headerColor || "#111"};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => setFontSizeByHeaderLevel(props.level)};
  line-height: 1.55em;
`;

export const Title: React.FC<{
  children?: React.ReactNode;
  level?: HeaderLevelInt;
}> = ({ children, level = 1 }) => {
  const tagName: HeaderLevelStr = `h${level}`;

  return (
    <StyledHeader as={tagName} level={level}>
      {children}
    </StyledHeader>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewTitle = styled(Title)<{ level: HeaderLevelInt }>``;

// Main button with styles
export default withTheme(NewTitle);
