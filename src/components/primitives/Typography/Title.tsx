import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { HeaderLevelInt, HeaderLevelStr } from "../../../types/titleTypes";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";

interface StyledHeader {
  level?: HeaderLevelInt;
}
export interface TitleProps
  extends StyledHeader,
    React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  as: keyof JSX.IntrinsicElements;
}

const StyledHeader = styled.h1<StyledHeader>`
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${(props) => {
    return props.theme.mode !== "light"
      ? props.theme.body.white
      : props.theme.body.gray1;
  }};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => setFontSizeByHeaderLevel(props.level)};
  line-height: 125%;
`;

export const Title: React.FC<TitleProps> = ({ children, level = 1, style }) => {
  const tagName: HeaderLevelStr = `h${level}`;

  return (
    <StyledHeader as={tagName} level={level} style={style}>
      {children}
    </StyledHeader>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewTitle = styled(Title)<StyledHeader>``;

// Main button with styles
export default withTheme(NewTitle);
