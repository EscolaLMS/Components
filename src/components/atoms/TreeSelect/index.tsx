import { useRef } from "react";
import ReactTreeSelect, {
  TreeSelectProps as ReactTreeSelectProps,
} from "rc-tree-select";
import styled from "styled-components";
import { Icon } from "../../../";
import { getFontFromTheme } from "../../../theme/provider";
import { getStylesBasedOnTheme } from "../../../utils/utils";

export type TreeSelectProps<ValueType> = Omit<
  ReactTreeSelectProps<ValueType>,
  "switcherIcon" | "inputIcon" | "treeNodeLabelProp" | "getPopupContainer"
>;

const Wrapper = styled.div`
  position: relative;

  .rc-tree-select {
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: center;

    .rc-tree-select-selector {
      position: relative;
      cursor: pointer;
      font-family: ${({ theme }) => getFontFromTheme(theme).fontFamily};
      font-size: 14px;
      padding: 12px;
      color: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
      .rc-tree-select-selection-placeholder,
      .rc-tree-select-selection-item {
        transition: 0.3s;
      }

      &.rc-tree-select-open {
        .rc-tree-select-arrow {
          transform: rotateX(180deg);
        }
      }

      &.rc-tree-select-disabled {
        .rc-tree-select-selector {
          cursor: default;
        }
        .rc-tree-select-arrow {
          display: none;
        }
      }

      .rc-tree-select-selection-search {
        position: absolute;
        inset: 0;
        pointer-events: none;

        input {
          width: 0;
          pointer-events: none;
          border: none;
          outline: none;
        }
      }
    }
  }

  .rc-tree-select-dropdown {
    position: absolute;
    padding-block: 12px;
    border: ${({ theme }) =>
      `1px solid ${getStylesBasedOnTheme(
        theme.mode,
        theme.gray5,
        theme.gray4
      )}`};
    border-radius: 12px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
    z-index: 99999;

    &.rc-tree-select-dropdown-hidden {
      display: none;
    }

    &.rc-tree-select-dropdown-empty {
      padding: 12px;
      text-align: center;
      font-style: italic;
    }

    .rc-tree-select-tree-treenode {
      display: flex;
      align-items: center;
      gap: 4px;
      padding-block: 2px;

      &:first-child {
        padding-top: 0;
      }

      .rc-tree-select-tree-indent {
        display: flex;

        .rc-tree-select-tree-indent-unit {
          display: block;
          width: 16px;
        }
      }

      .rc-tree-select-tree-switcher {
        cursor: pointer;
        border-radius: 4px;
        transition: 0.3s;

        &:hover {
          background-color: ${({ theme }) => theme.primaryColor};
        }

        &.rc-tree-select-tree-switcher_open {
          transform: rotate(90deg);
        }

        &.rc-tree-select-tree-switcher-noop {
          opacity: 0;
          pointer-events: none;
          cursor: default;
        }
      }

      .rc-tree-select-tree-node-content-wrapper {
        display: block;
        padding: 4px;
        border-radius: 4px;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.primaryColor};
        }

        &.rc-tree-select-tree-node-selected {
          background-color: ${({ theme }) => theme.primaryColor};
        }
      }
    }
  }
`;

export const TreeSelect = <ValueType,>({
  placeholder = "Provide data",
  ...props
}: TreeSelectProps<ValueType>) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <Wrapper ref={wrapperRef}>
      <ReactTreeSelect
        {...props}
        placeholder={placeholder}
        switcherIcon={
          <Icon name="chevronLeft" styles={{ with: 5, height: 10 }} />
        }
        treeNodeLabelProp="label"
        getPopupContainer={() => wrapperRef.current as HTMLDivElement}
      />
    </Wrapper>
  );
};
