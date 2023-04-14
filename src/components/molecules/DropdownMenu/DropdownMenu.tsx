/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, useRef, useState, cloneElement } from "react";
import { CSSTransition } from "react-transition-group";
import styled, { withTheme } from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { getStylesBasedOnTheme } from "../../../utils/utils";

interface DropdownMenuItem {
  id: number;
  content: React.ReactNode;
}

interface Props {
  child: React.ReactElement<{ onClick?: () => void; $isMenuOpen?: boolean }>;
  menuItems: DropdownMenuItem[];
  isInitiallyOpen?: boolean;
  onClick?: () => void;
}

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  cursor: pointer;
`;

const DropdownMenuWrapper = styled.ul`
  position: absolute;
  padding: 0px;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: max-content;
  box-shadow: 0 24px 34px rgba(66, 66, 66, 5%),
    0 -2px 8px rgba(255, 255, 255, 4%);

  // enter from
  &.fade-enter {
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
    transition: 0.3s;
  }

  // visible state when active
  &.fade-enter-done {
    opacity: 1;
  }

  // exit to
  &.fade-exit-active {
    opacity: 0;
    transition: 0.3s;
  }
`;
const MenuItem = styled.li`
  list-style: none;
  width: 100%;
  display: flex;
  background: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
  color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__primaryColor,
      theme.primaryColor,
      theme.primaryColor
    )};
  transition: 0.3s;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.dm__colorBackground};
  }

  & p {
    margin: 0px;
  }
`;

const DropdownMenu: FC<Props> = ({
  child,
  menuItems,
  isInitiallyOpen,

  onClick,
}) => {
  const dropdownMenuRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const closeMenu = () => setIsOpen(false);
  useOnClickOutside(dropdownMenuRef, () => closeMenu());

  return (
    <Wrapper onClick={onClick}>
      {cloneElement(child, {
        onClick: () => setIsOpen((prev) => !prev),
        $isMenuOpen: isOpen,
      })}
      <CSSTransition
        in={isOpen}
        timeout={300}
        nodeRef={dropdownMenuRef}
        classNames="fade"
        unmountOnExit
      >
        <DropdownMenuWrapper ref={dropdownMenuRef}>
          {menuItems.map(({ id, content }) => (
            <MenuItem key={id} onClick={closeMenu} onKeyDown={closeMenu}>
              {content}
            </MenuItem>
          ))}
        </DropdownMenuWrapper>
      </CSSTransition>
    </Wrapper>
  );
};

export default withTheme(styled(DropdownMenu)``);
