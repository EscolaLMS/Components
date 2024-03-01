import * as React from "react";
import styled, { withTheme } from "styled-components";
import { ReactNode } from "react";
import { getFontFromTheme } from "../../../theme/provider";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { getUniqueId } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

interface TabProps {
  label: string;
  key: number;
  component: ReactNode;
  hidden?: boolean;
}

export interface TabsProps extends ExtendableStyledComponent {
  tabs: TabProps[];
  defaultActiveKey: number;
  onClick?: (key: number) => void;
}

const StyledTabs = styled("div")`
  .tabs-menu {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.black, theme.white)};
    border-radius: ${({ theme }) => theme.cardRadius}px;
    padding: 8px;
    &-inner {
      display: flex;
    }
  }

  .tab-menu-btn {
    position: relative;
    padding: 6px 24px;
    appearance: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    white-space: nowrap;
    font-family: ${({ theme }) => getFontFromTheme(theme).fontFamily};
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
    border-radius: ${({ theme }) => theme.buttonRadius}px;
    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:nth-of-type(2) {
      border-radius: 0;
    }
    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    background-color: #f8f8f8;
    &.active {
      font-weight: bold;
      background-color: ${({ theme }) => theme.primaryColor};
      color: ${({ theme }) => theme.white};
      border-radius: ${({ theme }) => theme.buttonRadius}px;
    }
  }

  .tabs-panel {
    padding: 25px 0;
  }
`;

export const Tabs: React.FC<TabsProps> = (props) => {
  const {
    tabs = [],
    defaultActiveKey = tabs[0].key,
    onClick,
    className = "",
  } = props;
  const [selectedTab, setSelectedTab] =
    React.useState<number>(defaultActiveKey);
  const panel = tabs && tabs.find((tab) => tab.key === selectedTab);

  return (
    <StyledTabs className={`wellms-component ${className}`}>
      <div className={"tabs-menu"}>
        <div className={"tabs-menu-inner"}>
          {tabs.map((tab) => {
            if (tab.hidden) {
              return null;
            }

            return (
              <button
                type={"button"}
                className={`tab-menu-btn ${
                  selectedTab === tab.key ? "active" : ""
                }`}
                key={tab.key}
                id={getUniqueId(`tab-menu-${tab.key}`)}
                onClick={() => {
                  setSelectedTab(tab.key);
                  onClick && onClick(tab.key);
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div id={`tabpanel-${selectedTab}`} className={"tabs-panel"}>
        <React.Fragment>{panel && panel.component}</React.Fragment>
      </div>
    </StyledTabs>
  );
};

export default withTheme(styled(Tabs)<TabsProps>``);
