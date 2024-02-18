/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, useRef, useState, cloneElement, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import styled, { withTheme } from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import Text from "components/atoms/Typography/Text";

export interface DropdownMenuItem {
  id: number | string;
  content: React.ReactNode;
  redirect?: string;
}

interface Props {
  child: React.ReactElement<{ onClick?: () => void; $isMenuOpen?: boolean }>;
  menuItems: DropdownMenuItem[];
  isInitiallyOpen?: boolean;
  onClick?: () => void;
  onChange?: (listItem: DropdownMenuItem) => void;
}

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  cursor: pointer;
`;

const DropdownMenuWrapper = styled.ul`
  top: 30px;
  position: absolute;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: max-content;
  box-shadow: 0px 10px 15px #00000019;
  min-width: 175px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.gray3};
  background: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.buttonRadius}px;
  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: 0.3s;
  }

  &.fade-enter-done {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: 0.3s;
  }
`;
const MenuItem = styled.li`
  list-style: none;

  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.textColor};
  transition: 0.3s;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }

  & p {
    margin: 0px;
    padding: 12px;
  }
`;

const DropdownMenu: FC<Props> = ({
  child,
  menuItems,
  isInitiallyOpen,
  onClick,
  onChange,
}) => {
  // const [currID, setCurrID] = useState(0);
  const dropdownMenuRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const closeMenu = () => setIsOpen(false);
  useOnClickOutside(dropdownMenuRef, () => closeMenu());

  const onListItemClick = useCallback(
    (ind: number) => {
      // setCurrID(ind);
      onChange?.(menuItems[ind]);
      closeMenu();
    },
    [menuItems, onChange]
  );

  return (
    <Wrapper onClick={onClick}>
      {cloneElement(child as React.ReactElement, {
        onClick: () => setIsOpen((prev) => !prev),
        $isMenuOpen: isOpen,
        // children: isOpen ? "currID" : "Menu",
      })}
      <CSSTransition
        in={isOpen}
        timeout={300}
        nodeRef={dropdownMenuRef}
        classNames="fade"
        unmountOnExit
      >
        <DropdownMenuWrapper ref={dropdownMenuRef}>
          {menuItems.map(({ id, content }, index) => (
            <MenuItem
              key={id}
              onClick={() => onListItemClick(index)}
              onKeyDown={closeMenu}
            >
              <Text size="14" noMargin bold>
                {content}
              </Text>
            </MenuItem>
          ))}
        </DropdownMenuWrapper>
      </CSSTransition>
    </Wrapper>
  );
};

export default withTheme(styled(DropdownMenu)``);
