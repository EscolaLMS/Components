import * as React from "react";
import type { Tag } from "@escolalms/sdk/lib/types";
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
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

interface StyledTagsProps {
  mobile?: boolean;
  open?: boolean;
  lightContrast?: boolean;
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

interface TagsProps extends StyledTagsProps, ExtendableStyledComponent {
  tags: Tag[];
  label?: string;
  labelPrefix?: string;
  selectedTags?: string[];
  handleChange?: (newValue: string[]) => void;
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

const StyledTagsDropdown = styled("div")<StyledTagsProps>`
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

  .tags-collapse {
    color: currentColor;
  }

  .tags-dropdown-button {
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

  > .tags-dropdown-options {
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

  .tags-dropdown-options .tags-dropdown-options {
    margin-left: 20px;
  }
`;

const StyledTagsDrawer = createGlobalStyle<StyledTagsProps>`
  width: 100%;
  box-sizing: border-box;
  
  * {
    box-sizing: border-box;
  }
  
  .drawer-content-wrapper {
    left: 0;
    width: 100%;
  }
  
  .tags-drawer-list {
    > div {
      position: relative;
      margin-bottom: 4px;
    }
  
    .tags-drawer-list {
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
        getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
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
  
  .tags-collapse {
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  }
  
  label {
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  }
`;

const StyledTagsTreeOptions = styled("div")<StyledTagsProps>`
  .tags-collapse {
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

const TagsTreeOptions: React.FC<TagsProps> = (props) => {
  const {
    tags,
    labelPrefix,
    selectedTags = [],
    label,
    handleChange,
    mobile,
    className = "",
  } = props;

  const onInternalChange = React.useCallback(
    (tagName: string) => {
      if (handleChange) {
        handleChange(
          selectedTags.includes(tagName)
            ? selectedTags.filter((tag) => tag !== tagName)
            : [...selectedTags, tagName]
        );
      }
    },
    [selectedTags]
  );

  return (
    <StyledTagsTreeOptions
      className={`wellms-component ${
        mobile ? "tags-drawer-list" : "tags-dropdown-options"
      } ${className}`}
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
      {tags.map((tag: Tag) => (
        <div key={tag.id}>
          <Checkbox
            value={tag.id}
            label={labelPrefix ? `${labelPrefix}${tag.title}` : tag.title}
            checked={selectedTags.includes(tag.title)}
            onChange={() => onInternalChange(tag.title)}
          />
        </div>
      ))}
    </StyledTagsTreeOptions>
  );
};

const TagsDropdown: React.FC<TagsProps> = (props) => {
  const theme = React.useContext(ThemeContext);

  const {
    tags,
    labelPrefix,
    label,
    selectedTags,
    handleChange,
    backgroundColor = getStylesBasedOnTheme(
      theme.mode,
      theme.dm__background,
      theme.background
    ),
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
    <StyledTagsDropdown
      open={open}
      ref={ref}
      className="wellms-component"
      lightContrast={cts}
      backgroundColor={backgroundColor}
    >
      <button
        type={`button`}
        className={"tags-dropdown-button"}
        onClick={toggleOpen}
      >
        {label}{" "}
        {selectedTags && selectedTags.length > 0 && `(${selectedTags.length})`}
        <IconArrowBottom />
      </button>
      <TagsTreeOptions
        tags={tags}
        labelPrefix={labelPrefix}
        selectedTags={selectedTags}
        handleChange={handleChange}
      />
    </StyledTagsDropdown>
  );
};

const TagsDrawer: React.FC<TagsProps> = (props) => {
  const {
    tags,
    labelPrefix,
    label,
    handleChange,
    handleDrawerButtonClick,
    selectedTags,
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
      <StyledTagsDrawer />
      <Button type={"button"} mode={"outline"} onClick={onToggleDrawer}>
        {t("Tags.Filter")}{" "}
        {selectedTags && selectedTags.length > 0 && `(${selectedTags.length})`}
      </Button>
      <Drawer open={showDrawer} onClose={onToggleDrawer}>
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
          <TagsTreeOptions
            tags={tags}
            label={label}
            labelPrefix={labelPrefix}
            selectedTags={selectedTags}
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

export const Tags: React.FC<TagsProps> = (props) => {
  const { mobile } = props;

  return (
    <React.Fragment>
      {mobile ? (
        <TagsDrawer {...props} />
      ) : (
        <React.Fragment>
          <TagsDropdown {...props} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withTheme(styled(Tags)<TagsProps>``);
