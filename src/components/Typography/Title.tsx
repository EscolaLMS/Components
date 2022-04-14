import * as React from "react";

import styled, { withTheme, ThemeProvider } from "styled-components";

import { getFontFromTheme } from "../../theme/provider";

type LevelInt = 1 | 2 | 3 | 4 | 5 | 6;
type LevelStr = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  level?: LevelInt;
  as: keyof JSX.IntrinsicElements;
}

const StyledHeader = styled.h1<TitleProps>`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.headerColor || "#111"};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => {
    if (props.level) {
      switch (props.level) {
        case 1:
          return "50px";
        case 2:
          return "40px";
        case 3:
          return "36px";
        case 4:
        default:
          return "20px";
      }
    }
    return "20px";
  }};
  line-height: 1.55em;
`;

export const Title: React.FC<{
  children?: React.ReactNode;
  level?: LevelInt;
}> = ({ children, level = 1 }) => {
  const tagName: LevelStr = `h${level}`;

  return (
    <StyledHeader as={tagName} level={level}>
      {children}
    </StyledHeader>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewTitle = styled(Title)<{ level: LevelInt }>``;

// Main button with styles
export default withTheme(NewTitle);
