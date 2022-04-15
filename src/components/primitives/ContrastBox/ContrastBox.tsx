import * as React from "react";

import styled, {
  withTheme,
  ThemeProvider,
  ThemeContext,
} from "styled-components";

import { contrast } from "chroma-js";

import { getFontFromTheme } from "../../../theme/provider";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  lightContrast?: Boolean;
}

const StyledDiv = styled.div<TitleProps>`
  margin: 0;
  padding: 50px;
  color: ${(props) => (props.lightContrast ? "#fff" : "#000")};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  background: ${(props) => props.theme.primaryColor};
  text-transform: uppercase;
`;

export const ContrastBox: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
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
