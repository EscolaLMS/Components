import * as React from "react";
import type { Category } from "@escolalms/sdk/lib/types/api";
import styled, {
  createGlobalStyle,
  ThemeContext,
  withTheme,
} from "styled-components";
import { ReactNode, useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { contrast } from "chroma-js";
import { Title, Checkbox, Button } from "../../../";
import Drawer from "rc-drawer";
import { useTranslation } from "react-i18next";
import { getFontFromTheme } from "../../../theme/provider";

interface StyledCategoriesProps {
  mobile?: boolean;
  open?: boolean;
  lightContrast?: boolean;
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

interface CategoriesProps extends StyledCategoriesProps {
  categories: Category[];
  label?: string;
  labelPrefix?: string;
  selectedCategories?: number[];
  handleChange?: (newValue: number[]) => void;
  drawerTitle?: ReactNode;
  handleDrawerButtonClick?: () => void;
  drawerButtonText?: string;
}

const IconArrowBottom = () => {
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
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconArrowLeft = () => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1L1 7L7 13"
        stroke="#4A4A4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StyledCategoriesDropdown = styled("div")<StyledCategoriesProps>`
  position: relative;
  min-width: 150px;
  color: ${(props) =>
    props.lightContrast ? props.theme.gray4 : props.theme.gray2};
  border: ${(props) =>
    `1px solid ${props.open ? "currentColor" : "transparent"}`};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${({ theme, open }) =>
    open
      ? `${theme.inputRadius}px ${theme.inputRadius}px 0 0`
      : `${theme.inputRadius}px`};

  .categories-collapse {
    color: currentColor;
  }

  .categories-dropdown-button {
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
    font-weight: normal;
    cursor: pointer;
    color: currentColor;
    font-size: 16px;
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};

    svg {
      margin-left: 10px;
      transform: ${(props) => (props.open ? "rotate(180deg)" : "none")};
      transition: opacity 0.2s ease-in-out;

      path {
        stroke: currentColor;
      }
    }

    &:hover svg {
      opacity: 0.6;
    }

    &:after {
      position: absolute;
      bottom: 0;
      left: 10px;
      right: 10px;
      height: 1px;
      display: ${(props) => (props.open ? "block" : "none")};
      background-color: currentColor;
      content: "";
    }
  }

  > .categories-dropdown-options {
    padding: 7px 10px;
    position: absolute;
    top: 100%;
    left: -1px;
    width: calc(100% + 2px);
    max-height: ${(props) => (props.open ? "200px" : "auto")};
    height: ${(props) => (props.open ? "auto" : "0")};
    overflow-y: ${(props) => (props.open ? "auto" : "hidden")};
    display: ${(props) => (props.open ? "block" : "none")};
    box-sizing: border-box;
    background-color: ${(props) => props.backgroundColor};
    border: 1px solid currentColor;
    border-top: none;
    z-index: ${(props) => (props.open ? "1" : "0")};
    border-radius: ${({ theme }) =>
      `0 0 ${theme.inputRadius}px ${theme.inputRadius}px`};
    div {
      position: relative;
    }

    input {
      color: currentColor;
    }

    span {
      word-break: break-word;
      color: ${(props) =>
        props.lightContrast ? props.theme.gray4 : props.theme.gray2};
    }
  }

  .categories-dropdown-options .categories-dropdown-options {
    margin-left: 20px;
  }
`;

const StyledCategoriesDrawer = createGlobalStyle<StyledCategoriesProps>`
  width: 100%;
  box-sizing: border-box;
  
  * {
    box-sizing: border-box;
  }
  
  .drawer-content-wrapper {
    left: 0;
    width: 100%;
  }
  
  .categories-drawer-list {
    > div {
      position: relative;
      margin-bottom: 4px;
    }
  
    .categories-drawer-list {
      margin-left: 20px;
    }
  }
  
  .drawer-content {
    display: flex;
    flex-direction: column;
  }
  
  .drawer-content-header {
    position: relative;
    padding: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -2px 15px 0px #0000001A;
  }
  
  .drawer-content-btn {
    position: absolute;
    left: 22px;
    appearance: none;
    background-color: transparent;
    border: none;
    
    svg path {
      stroke: ${({ theme }) =>
        theme.mode === "light" ? theme.gray1 : theme.white};
      }
  }
  
  .drawer-content-inner {
    padding: 0 16px 32px 16px;
    flex: 1;
    overflow: auto;
  }
  
  .drawer-content-footer {
    padding: 16px;
    box-shadow: 0px -2px 15px 0px #0000001A;
  }
  
  .categories-collapse {
    color: ${({ theme }) =>
      theme.mode === "light" ? theme.gray1 : theme.white};
  }
  
  label {
    color: ${({ theme }) =>
      theme.mode === "light" ? theme.gray1 : theme.white};
  }
`;

const StyledCategoryTreeOptions = styled("div")<StyledCategoriesProps>`
  .categories-collapse {
    position: absolute;
    right: 0;
    top: 0;
    appearance: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`;

const CategoryTreeOptions: React.FC<CategoriesProps> = (props) => {
  const {
    categories,
    labelPrefix,
    selectedCategories = [],
    label,
    handleChange,
    mobile,
  } = props;

  const [collapseState, setCollapseState] = React.useState<{
    [key: number]: boolean;
  }>({});

  const handleCollapse = (id: number) => {
    setCollapseState({
      ...collapseState,
      [id]: !collapseState[id],
    });
  };

  const onInternalChange = React.useCallback(
    (id: number) => {
      if (handleChange) {
        handleChange(
          selectedCategories.includes(id)
            ? selectedCategories.filter((pid) => pid !== id)
            : [...selectedCategories, id]
        );
      }
    },
    [selectedCategories]
  );

  return (
    <StyledCategoryTreeOptions
      className={
        mobile ? "categories-drawer-list" : "categories-dropdown-options"
      }
    >
      {mobile && label && (
        <Title
          level={5}
          style={{
            marginTop: "32px",
            marginBottom: "17px",
          }}
        >
          {label}
        </Title>
      )}
      {categories.map((category: Category) => (
        <div key={category.id}>
          <Checkbox
            value={category.id}
            label={
              labelPrefix ? `${labelPrefix}${category.name}` : category.name
            }
            checked={selectedCategories.includes(category.id)}
            onChange={() => onInternalChange(category.id)}
          />

          {category &&
            category.subcategories &&
            category.subcategories.length > 0 && (
              <React.Fragment>
                <button
                  type={"button"}
                  onClick={() => handleCollapse(category.id)}
                  className="categories-collapse"
                >
                  <IconArrowBottom />
                </button>
                {collapseState[category.id] && (
                  <CategoryTreeOptions
                    categories={category.subcategories}
                    handleChange={handleChange}
                    selectedCategories={selectedCategories}
                    mobile={mobile}
                  />
                )}
              </React.Fragment>
            )}
        </div>
      ))}
    </StyledCategoryTreeOptions>
  );
};

const CategoriesDropdown: React.FC<CategoriesProps> = (props) => {
  const theme = React.useContext(ThemeContext);

  const {
    categories,
    labelPrefix,
    label,
    selectedCategories,
    handleChange,
    backgroundColor = theme.mode === "light"
      ? theme.backgroundLight
      : theme.backgroundDark,
  } = props;

  const cts = React.useMemo(() => {
    return contrast("#fff", backgroundColor) >= 1.85;
  }, [backgroundColor]);

  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <StyledCategoriesDropdown
      className="wellms-component"
      open={open}
      ref={ref}
      lightContrast={cts}
      backgroundColor={backgroundColor}
    >
      <button
        type={`button`}
        className={"categories-dropdown-button"}
        onClick={toggleOpen}
      >
        {label}{" "}
        {selectedCategories &&
          selectedCategories.length > 0 &&
          `(${selectedCategories.length})`}
        <IconArrowBottom />
      </button>
      <CategoryTreeOptions
        categories={categories}
        labelPrefix={labelPrefix}
        selectedCategories={selectedCategories}
        handleChange={handleChange}
      />
    </StyledCategoriesDropdown>
  );
};

const CategoriesDrawer: React.FC<CategoriesProps> = (props) => {
  const {
    categories,
    labelPrefix,
    label,
    handleChange,
    handleDrawerButtonClick,
    selectedCategories,
    drawerButtonText,
    drawerTitle,
    mobile,
  } = props;
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { t } = useTranslation();
  const onToggleDrawer = () => {
    setShowDrawer((value) => !value);
  };

  return (
    <React.Fragment>
      <StyledCategoriesDrawer />
      <Button type={"button"} mode={"outline"} onClick={onToggleDrawer}>
        {t("Categories.Filter")}{" "}
        {selectedCategories &&
          selectedCategories.length > 0 &&
          `(${selectedCategories.length})`}
      </Button>
      <Drawer
        open={showDrawer}
        handler={false}
        onClose={onToggleDrawer}
        level={null}
      >
        <div className={"drawer-content-header"}>
          <button
            type={"button"}
            onClick={onToggleDrawer}
            className={"drawer-content-btn"}
          >
            <IconArrowLeft />
          </button>
          {drawerTitle && <React.Fragment>{drawerTitle}</React.Fragment>}
        </div>
        <div className={"drawer-content-inner"}>
          <CategoryTreeOptions
            categories={categories}
            label={label}
            labelPrefix={labelPrefix}
            selectedCategories={selectedCategories}
            handleChange={handleChange}
            mobile={mobile}
          />
        </div>
        {drawerButtonText && handleDrawerButtonClick && (
          <div className={"drawer-content-footer"}>
            <Button
              block
              mode={"secondary"}
              onClick={() => {
                onToggleDrawer();
                handleDrawerButtonClick && handleDrawerButtonClick();
              }}
            >
              {drawerButtonText && drawerButtonText}
            </Button>
          </div>
        )}
      </Drawer>
    </React.Fragment>
  );
};

export const Categories: React.FC<CategoriesProps> = (props) => {
  const { mobile } = props;

  return (
    <React.Fragment>
      {mobile ? (
        <CategoriesDrawer {...props} />
      ) : (
        <React.Fragment>
          <CategoriesDropdown {...props} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withTheme(styled(Categories)<CategoriesProps>``);
