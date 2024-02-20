import React, { FC, useRef, useState, useCallback, cloneElement } from "react";
import { CSSTransition } from "react-transition-group";
import styled, { withTheme } from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { Checkbox } from "components/atoms/Option/Checkbox";
import Text from "components/atoms/Typography/Text";
import { Category } from "@escolalms/sdk/lib/types/api";

interface Props {
  categories: Category[];
  checkedCategories: Category[];
  isInitiallyOpen?: boolean;
  onChange: (category: Category) => void;
  onClick?: () => void;
  onClear?: () => void;
  child?: React.ReactElement<{ onClick?: () => void; $isMenuOpen?: boolean }>;
}

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  cursor: pointer;
`;

const DropdownMenuWrapper = styled.ul`
  top: 10px;
  position: absolute;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: max-content;
  box-shadow: 0px 10px 15px #00000019;
  min-width: 175px;
  padding: 0px;
  padding-bottom: 19px;
  border: 1px solid ${({ theme }) => theme.gray3};
  background: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.buttonRadius}px;
  min-width: 300px;
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
  display: flex;
  padding: 0px 14px;
  flex-direction: column;
  &:not(&:last-child) {
    margin-bottom: 20px;
  }
  > div {
    display: flex;
    flex-direction: column;
    label {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .subcategories {
    margin-top: 15px;
    margin-left: 20px;
  }
`;

const ClearItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
  padding: 13px 14px;
  p {
    margin: 0;
  }
  button {
    all: unset;
    opacity: 0.55;
  }
`;

const DropdownCategoriesRecursive: FC<
  Pick<Props, "categories" | "checkedCategories" | "onChange">
> = ({ categories, checkedCategories, onChange }: Props) => {
  const handleCategoryClick = (category: Category) => {
    onChange(category);
  };

  return (
    <>
      {categories.map((category: Category) => (
        <MenuItem key={category.id}>
          <Checkbox
            name={category.name}
            label={category.name}
            checked={
              checkedCategories.find((item) => item.id === category.id)
                ? true
                : false
            }
            onChange={() => handleCategoryClick(category)}
          />

          {category.subcategories && category.subcategories.length > 0 && (
            <div className="subcategories">
              <DropdownCategoriesRecursive
                checkedCategories={checkedCategories}
                categories={category.subcategories}
                onChange={onChange}
              />
            </div>
          )}
        </MenuItem>
      ))}
    </>
  );
};

export const DropdownCategories: React.FC<Props> = ({
  child,
  categories,
  checkedCategories,
  isInitiallyOpen,
  onClick,
  onChange,
  onClear,
}) => {
  const dropdownMenuRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const closeMenu = () => setIsOpen(false);
  useOnClickOutside(dropdownMenuRef, () => closeMenu());

  const handleCategoryClick = useCallback(
    (category: Category) => {
      onChange?.(category);
    },
    [onChange]
  );

  const handleClear = () => {
    onClear?.();
    closeMenu();
  };

  return (
    <Wrapper onClick={onClick}>
      {cloneElement(child as React.ReactElement, {
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
          <ClearItem>
            <Text size="16">Wybierz</Text>
            <button onClick={handleClear}>
              <Text size="13">Wyczyść</Text>
            </button>
          </ClearItem>
          <DropdownCategoriesRecursive
            checkedCategories={checkedCategories}
            categories={categories}
            onChange={handleCategoryClick}
          />
        </DropdownMenuWrapper>
      </CSSTransition>
    </Wrapper>
  );
};

export default withTheme(styled(DropdownCategories)``);
