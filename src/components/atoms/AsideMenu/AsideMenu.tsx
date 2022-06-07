import * as React from "react";
import { PropsWithChildren } from "react";
import styled, { withTheme } from "styled-components";
import { default as chroma } from "chroma-js";

interface AsideMenuProps {
  active?: string;
}

const StyledDiv = styled("div")<AsideMenuProps>`
  margin-bottom: 5px;
  padding: 11px 15px;
  display: flex;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: ${(props) => props.theme.cardRadius}px;

  border-left-color: ${(props) =>
    props.active ? props.theme.primaryColor : "transparent"};
  border-left-width: 3px;
  border-left-style: solid;

  transition: border-left 0.4s;

  background: ${({ theme }) =>
    theme.mode === "light"
      ? theme.cardBackgroundColorDark
      : theme.cardBackgroundColorLight};
  &:hover {
    border-left-color: ${(props) =>
      props.active
        ? props.theme.primaryColor
        : chroma(props.theme.primaryColor).alpha(0.5).css()};
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
  const { children, active } = props;
  return <StyledDiv active={active}>{children}</StyledDiv>;
};

export default withTheme(styled(AsideMenu)<AsideMenuProps>``);
