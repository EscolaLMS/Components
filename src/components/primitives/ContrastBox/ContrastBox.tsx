import * as React from "react";

import styled, {
  withTheme,
  ThemeProvider,
  ThemeContext,
} from "styled-components";

import { contrast } from "chroma-js";

import { getFontFromTheme } from "../../../theme/provider";

type LevelInt = 1 | 2 | 3 | 4 | 5 | 6;
type LevelStr = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  lightContrast?: Boolean;
}

const StyledDiv = styled.div<TitleProps>`
  margin: 0;
  padding: 50px;
  color: ${(props) => (props.lightContrast ? "#fff" : "000")};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  background: ${(props) => props.theme.primaryColor};
`;

export const ContrastBox: React.FC<{
  children?: React.ReactNode;
  level?: LevelInt;
}> = ({ children, level = 1 }) => {
  const theme = React.useContext(ThemeContext);

  const cts = React.useMemo(() => {
    return contrast("#fff", theme.primaryColor) >= 5;
  }, [theme.primaryColor]);

  return <StyledDiv lightContrast={cts}>{children}</StyledDiv>;
};

// https://styled-components.com/docs/api#using-custom-props
const NewComponent = styled(ContrastBox)<{ lightContrast: boolean }>``;

// Main button with styles
export default withTheme(NewComponent);
