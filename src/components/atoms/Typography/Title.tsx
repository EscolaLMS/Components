import * as React from "react";
import styled, { css, withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { HeaderLevelInt, HeaderLevelStr } from "../../../types/titleTypes";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";

interface StyledHeader {
  level?: HeaderLevelInt;
  mobile?: boolean;
}
export interface TitleProps
  extends StyledHeader,
    React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const SharedHeaderStyles = css<StyledHeader>`
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: ${(props) => setFontSizeByHeaderLevel(props.level, props.mobile)};
  line-height: 125%;
  &,
  & > * {
    color: ${(props) => {
      return props.theme.mode !== "light"
        ? props.theme.white
        : props.theme.gray1;
    }};
  }
`;

const StyledHeader = styled.h1<StyledHeader>`
  ${SharedHeaderStyles}
`;

export const Title: React.FC<TitleProps> = (props) => {
  const { children, level = 1, mobile = false, as } = props;
  const tagName: HeaderLevelStr = (as as HeaderLevelStr) ?? `h${level}`;

  return (
    <StyledHeader
      as={tagName}
      level={level}
      mobile={mobile}
      {...props}
      className="wellms-component"
    >
      {children}
    </StyledHeader>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewTitle = styled(Title)<StyledHeader>`
  ${SharedHeaderStyles}
`;
// Main button with styles
export default withTheme(NewTitle);
