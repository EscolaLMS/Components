import * as React from "react";
import type { Category } from "@escolalms/sdk/lib/types/api";
import styled, { ThemeContext, withTheme } from "styled-components";
import { Checkbox } from "../../atoms/Option/Checkbox";
import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { contrast } from "chroma-js";
import Drawer from "rc-drawer";

interface StyledCategoriesProps {
  mobile?: boolean;
  isFocused?: boolean;
  lightContrast?: boolean;
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

interface CategoryTreeOptionsProps extends StyledCategoriesProps {
  categories: Category[];
  id?: number;
}

interface CategoriesProps extends StyledCategoriesProps {
  categories: Category[];
  onChange: (value: string) => void;
  label: string;
  id?: number;
}

const CategoryTreeOptions: React.FC<CategoryTreeOptionsProps> = (props) => {
  const { categories } = props;
  const [ids, setIds] = React.useState<Array<number>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = Number(event.target.value);

    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId);
      setIds(newIds);
    } else {
      const newIds = [...ids];
      newIds.push(selectedId);
      setIds(newIds);
    }
  };

  return (
    <React.Fragment>
      {categories.map((category: Category) => (
        <React.Fragment key={category.id}>
          <Checkbox
            id={`category-${category.id}`}
            onChange={handleChange}
            value={category.id}
            label={category.name}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const IconArrow = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#F2F2F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StyledCategories = styled("div")<StyledCategoriesProps>`
  position: relative;
  min-width: 150px;
  color: ${(props) =>
    props.lightContrast ? props.theme.gray4 : props.theme.gray2};
  border: ${(props) =>
    `1px solid ${props.isFocused ? "currentColor" : "transparent"}`};
  background-color: ${(props) => props.backgroundColor};

  .category-dropdown-button {
    position: relative;
    justify-content: space-between;
    padding: 7px 10px;
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    appearance: none;
    background-color: transparent;
    border: none;
    font-weight: bold;
    cursor: pointer;
    color: currentColor;

    svg {
      margin-left: 10px;
      transform: ${(props) => (props.isFocused ? "rotate(180deg)" : "none")};

      path {
        stroke: currentColor;
      }
    }

    &:after {
      position: absolute;
      bottom: 0;
      left: 10px;
      right: 10px;
      height: 1px;
      display: ${(props) => (props.isFocused ? "block" : "none")};
      background-color: currentColor;
      content: "";
    }
  }

  .category-dropdown-options {
    padding: 7px 10px;
    position: absolute;
    top: 100%;
    left: -1px;
    width: calc(100% + 2px);
    max-height: ${(props) => (props.isFocused ? "200px" : "auto")};
    height: ${(props) => (props.isFocused ? "auto" : "0")};
    overflow-y: ${(props) => (props.isFocused ? "auto" : "hidden")};
    display: ${(props) => (props.isFocused ? "block" : "none")};
    box-sizing: border-box;
    background-color: ${(props) => props.backgroundColor};
    border: 1px solid currentColor;
    border-top: none;
    z-index: ${(props) => (props.isFocused ? "1" : "0")};

    > div[type="checkbox"] {
      color: currentColor;
    }

    span {
      word-break: break-word;
    }
  }
`;

export const Categories: React.FC<CategoriesProps> = (props) => {
  const theme = React.useContext(ThemeContext);
  const {
    mobile,
    categories,
    id,
    label,
    backgroundColor = theme.mode === "light"
      ? theme.backgroundLight
      : theme.backgroundDark,
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const cts = React.useMemo(() => {
    return contrast("#fff", backgroundColor) >= 1.85;
  }, [backgroundColor]);

  useOnClickOutside(ref, () => setIsFocused(false));

  return (
    <StyledCategories
      isFocused={isFocused}
      backgroundColor={backgroundColor}
      lightContrast={cts}
    >
      {mobile ? (
        <button type={"button"}>Filtruj</button>
      ) : (
        <div className={"category-dropdown"} ref={ref}>
          <button
            type={"button"}
            className={"category-dropdown-button"}
            onClick={toggleFocus}
          >
            {label}
            <IconArrow />
          </button>
          <div className={"category-dropdown-options"}>
            <CategoryTreeOptions categories={categories} id={id} />
          </div>
        </div>
      )}
    </StyledCategories>
  );
};

export default withTheme(styled(Categories)<CategoriesProps>``);
