import * as React from "react";

import styled, { withTheme, ThemeProvider } from "styled-components";

const StyledDiv = styled.div`
  /* Adapt the colors based on primary prop */
  background: ${(props) => props.theme?.mainColor || "black"};
  radius: ${(props) => props.theme?.radius || 0}px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
`;

export const MainColor: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StyledDiv>
      <span className={`button`}>{children}</span>
    </StyledDiv>
  );
};

export default withTheme(StyledDiv);
