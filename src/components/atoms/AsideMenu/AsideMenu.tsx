import * as React from "react";
import { PropsWithChildren } from "react";
import styled, { withTheme } from "styled-components";
import { default as chroma } from "chroma-js";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

interface AsideMenuProps extends ExtendableStyledComponent {
  active?: boolean;
}

const StyledDiv = styled("div")<AsideMenuProps>`
  margin-bottom: 5px;
  padding: 11px 15px;
  display: flex;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  border-radius: ${(props) => props.theme.cardRadius}px;

  border-left-color: ${({ active, theme }) =>
    active
      ? getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          theme.primaryColor
        )
      : "transparent"};
  border-left-width: 3px;
  border-left-style: solid;

  transition: border-left 0.4s;

  background: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.cardBackgroundColor
    )};
  &:hover {
    border-left-color: ${({ active, theme }) =>
      active
        ? getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )
        : chroma(theme.primaryColor).alpha(0.5).css()};
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AsideMenu: React.FC<PropsWithChildren<AsideMenuProps>> = (
  props
) => {
  const { children, active, className = "" } = props;
  return (
    <StyledDiv active={active} className={`wellms-component ${className}`}>
      {children}
    </StyledDiv>
  );
};

export default withTheme(styled(AsideMenu)<AsideMenuProps>``);
