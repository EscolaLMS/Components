import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getStylesBasedOnTheme } from "../../utils/utils";

import { getFontFromTheme } from "../../theme/provider";

const StyledDiv = styled.div<{ mode: string }>`
  /* Adapt the colors based on primary prop */
  background: ${({ theme, mode }) => {
    if (mode === "primary") {
      return getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      );
    }
    if (mode === "secondary") {
      return getStylesBasedOnTheme(
        theme.mode,
        theme.dm__secondaryColor,
        theme.secondaryColor,
        theme.primaryColor
      );
    }
    return "black";
  }};
  border-radius: ${(props) => props.theme?.radius || 0}px;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  width: 200px;
  height: 200px;
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
