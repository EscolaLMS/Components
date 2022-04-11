import * as React from "react";

import styled, { withTheme, ThemeProvider } from "styled-components";

export interface BadgeProps {
  /** this is color description */
  color?: string;
  children?: React.ReactNode;
}

const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => props.theme?.buttonBackground || "black"};
  color: ${(props) => props.theme?.buttonColor || "white"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Button: React.FC<BadgeProps> = ({ children }) => {
  return (
    <StyledButton>
      <span className={`button`}>{children}</span>
    </StyledButton>
  );
};

export default withTheme(StyledButton);
