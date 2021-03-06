import * as React from "react";
import styled, { withTheme } from "styled-components";
import { ReactNode } from "react";
import { getFontFromTheme } from "../../../theme/provider";

interface TabProps {
  label: string;
  key: number;
  component: ReactNode;
}

export interface TabsProps {
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

    &-inner {
      display: flex;
      border-bottom: 2px solid
        ${({ theme }) => (theme.mode === "light" ? theme.gray3 : theme.gray2)};
    }
  }

  .tab-menu-btn {
    position: relative;
    padding: 11px;
    appearance: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
    font-family: ${({ theme }) => getFontFromTheme(theme).fontFamily};
    color: ${({ theme }) =>
      theme.mode === "light" ? theme.gray1 : theme.white};

    &.active {
      font-weight: bold;

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: currentColor;
      }
    }
  }

  .tabs-panel {
    padding: 10px 0;
  }
`;

export const Tabs: React.FC<TabsProps> = (props) => {
  const { tabs = [], defaultActiveKey = tabs[0].key, onClick } = props;
  const [selectedTab, setSelectedTab] =
    React.useState<number>(defaultActiveKey);
  const panel = tabs && tabs.find((tab) => tab.key === selectedTab);

  return (
    <StyledTabs>
      <div className={"tabs-menu"}>
        <div className={"tabs-menu-inner"}>
          {tabs.map((tab) => {
            return (
              <button
                type={"button"}
                className={`tab-menu-btn ${
                  selectedTab === tab.key ? "active" : ""
                }`}
                key={tab.key}
                id={`tab-menu-${tab.key}`}
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
