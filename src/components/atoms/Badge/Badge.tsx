import * as React from "react";

import styled, { withTheme, ThemeContext } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { contrast } from "chroma-js";
import { PropsWithChildren } from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  color?: string;
  lightContrast?: boolean;
}

const StyledDiv = styled("div")<BadgeProps>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => {
    return props.color || props.theme?.primaryColor || "black";
  }};
  color: ${(props) => (props.lightContrast ? "#fff" : "#000")};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-weight: bold;
  font-size: 10px;
  line-height: 1.3em;
  border: none;
  padding: 6px 12px;
  border-radius: ${(props) => props.theme?.buttonRadius || 2}px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  display: inline-flex;
  text-transform: uppercase;
`;

export const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  children,
  color,
  ...props
}) => {
  const theme = React.useContext(ThemeContext);

  const cts = React.useMemo(() => {
    return contrast("#fff", color || theme.primaryColor) >= 2.5;
  }, [color || theme.primaryColor]);

  return (
    <StyledDiv
      lightContrast={cts}
      color={color}
      {...props}
      className="wellms-component"
    >
      {children}
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewButton = styled(Badge)<{ color?: string }>``;

// Main button with styles
export default withTheme(NewButton);
