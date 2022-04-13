import * as React from "react";

import styled, { withTheme, ThemeProvider } from "styled-components";

import { getFontFromTheme } from "../../theme/provider";

const StyledDiv = styled.div<{ mode: string }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => {
    if (props.mode === "primary" && props.theme.primaryColor) {
      return props.theme.primaryColor;
    }
    if (props.mode === "secondary" && props.theme.secondaryColor) {
      return props.theme.secondaryColor;
    }
    return "black";
  }};
  border-radius: ${(props) => props.theme?.radius || 0}px;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
`;

export const ColorBox: React.FC<{
  children?: React.ReactNode;
  mode: "primary" | "secondary";
}> = ({ children, mode = "primary" }) => {
  return (
    <StyledDiv mode={mode}>
      <span className={`button`}>{children}</span>
    </StyledDiv>
  );
};

export default withTheme(StyledDiv);
