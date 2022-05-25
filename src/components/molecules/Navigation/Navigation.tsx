import * as React from "react";
import { useState, ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Logo, LogoProps } from "../../atoms/Logo/Logo";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { Col, Row } from "react-grid-system";

const ArrowLeftIcon = () => {
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
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const ArrowRigthIcon = () => {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 11L6.5 6L1.5 1"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const CrossIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.877 5.68889C19.2676 6.07941 19.2676 6.71258 18.877 7.1031L6.87703 19.1031C6.4865 19.4936 5.85334 19.4936 5.46282 19.1031C5.07229 18.7126 5.07229 18.0794 5.46282 17.6889L17.4628 5.68889C17.8533 5.29836 18.4865 5.29836 18.877 5.68889Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.46282 5.68889C5.85334 5.29836 6.4865 5.29836 6.87703 5.68889L18.877 17.6889C19.2676 18.0794 19.2676 18.7126 18.877 19.1031C18.4865 19.4936 17.8533 19.4936 17.4628 19.1031L5.46282 7.1031C5.07229 6.71258 5.07229 6.07941 5.46282 5.68889Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface DrawerSubmenuHistoryRow {
  menuItems: MenuItem[];
  key: string;
  title: ReactNode;
}

interface DrawerSubmenuHistory {
  [key: number]: DrawerSubmenuHistoryRow;
}

interface MenuItem {
  title: ReactNode;
  key: string;
  children?: MenuItem[];
  icon?: JSX.Element;
  link?: ReactNode;
}
export interface NavigationProps {
  mobile?: boolean;
  logo: LogoProps;
  menuItems: MenuItem[];
}

const GlobalStyle = createGlobalStyle`
.drawer-content {
  background: ${({ theme }) =>
    theme.mode !== "dark" ? theme.backgroundLight : theme.backgroundDark};
}
.drawer-header {
  display: inline-flex;
  width: 100%;
  align-items: center;
  background: ${({ theme }) =>
    theme.mode !== "dark" ? theme.backgroundLight : theme.backgroundDark};
  justify-content: space-between;
  padding: 15px 16px;
  box-sizing: border-box;
  box-shadow: 0px -2px 15px rgba(0, 0, 0, 0.1);
  ${({ theme }) => {
    if (theme.mode === "dark") {
      return `border-bottom: 1px solid ${theme.gray1}`;
    }
  }};
  * {
    color: ${({ theme }) =>
      theme.mode !== "dark" ? theme.gray2 : theme.white};
    font-weight: 700;
  }
  
}
.menu-drawer-close {
  cursor: pointer;
  padding: 0 6px;
}
.drawer-menu-item {
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  background: ${({ theme }) =>
    theme.mode !== "dark" ? theme.backgroundLight : theme.backgroundDark};
    font-weight: 700;
    
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: ${({ theme }) =>
    `1px solid ${theme.mode !== "dark" ? theme.gray3 : theme.gray1}`};
}
.drawer-menu-item__subtitle {
  padding: 18px 16px;
  color: ${({ theme }) => (theme.mode !== "dark" ? theme.gray2 : theme.white)};
}
.drawer-menu-item__title {
  width: 100%;
  * {
  color: ${({ theme }) => (theme.mode !== "dark" ? theme.gray2 : theme.white)};
    padding: 18px 16px;
    display: block;
    box-sizing: border-box;
    width: 100%;
    text-decoration: none;
  }
}
.drawer-nested-submenu-header-container {
  width: 100%;
  cursor: pointer;
}
.drawer-nested-submenu-header {
  text-align:center;
}
.drawer-menu-list {
  margin: 0;
  list-style-type: none;
  padding: 0;
}
.drawer-menu-item__icon {
  padding-right: 16px;
  color: ${({ theme }) => (theme.mode !== "dark" ? theme.gray2 : theme.white)};
}
`;

const StyledNavigation = styled("div")`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 16px;
  }
  .menu-button {
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .menu-bar {
    width: 19px;
    height: 2px;
    margin: 2px 0;
    background: ${(props) => props.theme.gray1};
    cursor: pointer;
  }
`;

export const Navigation: React.FC<NavigationProps> = (props) => {
  const { mobile, logo, menuItems } = props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [drawerSubmenuHistory, setDrawerSubmenuHistory] =
    useState<DrawerSubmenuHistory>({});
  const [currentMenuItems, setCurrentMenuItems] =
    useState<MenuItem[]>(menuItems);

  const onCloseDrawer = () => {
    setMobileMenuOpen(false);
    setDrawerSubmenuHistory({});
    setCurrentMenuItems(menuItems);
  };

  const onDrawerSubMenuClick = (
    menuItems: MenuItem,
    parentsMenuItem: MenuItem[]
  ) => {
    if (menuItems.children) {
      const drawerSubmenuHistoryLength =
        Object.keys(drawerSubmenuHistory).length;
      setDrawerSubmenuHistory({
        ...drawerSubmenuHistory,
        [drawerSubmenuHistoryLength]: {
          menuItems: parentsMenuItem,
          key: menuItems.key,
          title: menuItems.title,
        },
      });
      setCurrentMenuItems(menuItems.children);
    }
  };

  const onDrawerSubMenuBackClick = () => {
    const drawerSubmenuHistoryObjectKey =
      Object.keys(drawerSubmenuHistory).length - 1;
    const copyDrawerSubmenuHistory = { ...drawerSubmenuHistory };
    setCurrentMenuItems(
      copyDrawerSubmenuHistory[drawerSubmenuHistoryObjectKey].menuItems
    );
    delete copyDrawerSubmenuHistory[drawerSubmenuHistoryObjectKey];
    setDrawerSubmenuHistory(copyDrawerSubmenuHistory);
  };

  const renderMobileMenu = (_menuItems: MenuItem[]): JSX.Element => {
    return (
      <nav>
        <ul className="drawer-menu-list">
          {_menuItems.map((menuItem) => {
            return (
              <li>
                <div
                  role={menuItem.children && "button"}
                  className="drawer-menu-item"
                  onClick={() =>
                    menuItem.children
                      ? onDrawerSubMenuClick(menuItem, _menuItems)
                      : undefined
                  }
                  onKeyUp={() =>
                    menuItem.children
                      ? onDrawerSubMenuClick(menuItem, _menuItems)
                      : undefined
                  }
                  key={menuItem.key}
                >
                  {menuItem.children ? (
                    <>
                      <span className="drawer-menu-item__subtitle">
                        {menuItem.title}
                      </span>
                      <span className="drawer-menu-item__icon">
                        <ArrowRigthIcon />
                      </span>
                    </>
                  ) : (
                    <span
                      className="drawer-menu-item__title"
                      onClick={onCloseDrawer}
                      onKeyUp={onCloseDrawer}
                      tabIndex={0}
                      role="link"
                    >
                      {menuItem.title}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  return (
    <>
      {mobile ? (
        <StyledNavigation>
          <GlobalStyle />
          <div className="header">
            <Logo {...logo} />
            <span
              className="menu-button"
              onClick={() => setMobileMenuOpen(true)}
              onKeyUp={() => setMobileMenuOpen(true)}
              role="menubar"
              tabIndex={0}
            >
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
            </span>
          </div>
          <Drawer open={mobileMenuOpen} handler={false} width="100%">
            <div className="drawer-header">
              {Object.keys(drawerSubmenuHistory).length > 0 ? (
                <div
                  className="drawer-nested-submenu-header-container"
                  onClick={() => onDrawerSubMenuBackClick()}
                  onKeyUp={() => onDrawerSubMenuBackClick()}
                  role="button"
                  tabIndex={0}
                >
                  <Row>
                    <Col xs={2}>
                      <ArrowLeftIcon />
                    </Col>
                    <Col xs={8} className="drawer-nested-submenu-header">
                      {
                        drawerSubmenuHistory[
                          Object.keys(drawerSubmenuHistory).length - 1
                        ].title
                      }
                    </Col>
                  </Row>
                </div>
              ) : (
                <>
                  <Logo {...logo} />
                  <span
                    className="menu-drawer-close"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    onKeyUp={() => setMobileMenuOpen(!mobileMenuOpen)}
                    role="button"
                    tabIndex={0}
                  >
                    <CrossIcon />
                  </span>
                </>
              )}
            </div>
            <div>{renderMobileMenu(currentMenuItems)}</div>
          </Drawer>
        </StyledNavigation>
      ) : (
        <></>
      )}
    </>
  );
};
