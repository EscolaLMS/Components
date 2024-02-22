import * as React from "react";
import { useState, ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Logo, LogoProps } from "../../atoms/Logo/Logo";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { Col, Row } from "react-grid-system";
import { Text } from "../../../";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { t } from "i18next";
import { ExtendableStyledComponent } from "types/component";

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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArrowRightIcon = () => {
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
export interface NavigationProps extends ExtendableStyledComponent {
  mobile?: boolean;
  logo: LogoProps;
  menuItems: MenuItem[];
  search?: ReactNode;
  notification?: ReactNode;
  cart?: ReactNode;
  profile?: ReactNode;
}

const GlobalStyle = createGlobalStyle`

.custom-drawer-wrapper {
  @media (max-width: 530px) {
    width: 90% !important;
  }
}
  svg {
    transition: opacity 0.2s ease-in-out;
  
    &:hover {
      opacity: 0.65;
      cursor: pointer;
    }
  }
  
  .drawer-search {
    padding: 24px 16px;
  }

  .drawer,
  .drawer-content-wrapper {
    box-sizing: border-box;
  }

  .drawer-content-wrapper {
    width: 100%;
    box-sizing: border-box;
  }
  
  .drawer-header {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 15px 16px;
    box-sizing: border-box;
    /* box-shadow: 0px -2px 15px rgba(0, 0, 0, 0.1); */
  }

  .drawer-content {
    background: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__background,
        theme.background
      )};
  }
  
  .drawer-menu-list {
    margin: 0;
    list-style-type: none;
    padding: 0;
    li {
      padding: 10px 0px;
    }
  }
  
  .drawer-menu-item {
    padding: 15px 16px;
    box-sizing: border-box;
    display: flex;
    cursor: pointer;      
    align-items: center;
    justify-content: space-between;
    width: 100%;
   
      
    a {
      text-decoration: none;
    }
  }
  
  .drawer-nested-submenu-header-container {
    width: 100%;
  }

  .drawer-nested-submenu-header {
    text-align: center;
  }
  
  .drawer-menu-item__icon svg path,
  .menu-drawer-prev svg path {
    stroke: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  }
  
  .menu-drawer-close svg path {
    fill: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
  }
  
  .drawer-menu-item__wrapper {
    width: 100%;
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
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.65;
    }
  }
  .menu-bar {
    width: 19px;
    height: 2px;
    margin: 2.4px 0;
    border-radius: 3px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.textColor)};
    cursor: pointer;
  }
`;

const IconsHeaderMobileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg,
  button {
    width: 28px;
    height: 28px;
  }
`;

export const Navigation: React.FC<NavigationProps> = (props) => {
  const { mobile, logo, menuItems, search, className = "" } = props;
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
          {_menuItems.map((menuItem, i) => {
            return (
              Object.keys(menuItem).length > 0 && (
                <li key={i}>
                  <div
                    role={menuItem.children ? "button" : undefined}
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
                        {menuItem.title}
                        <span className="drawer-menu-item__icon">
                          <ArrowRightIcon />
                        </span>
                      </>
                    ) : (
                      <div
                        className={"drawer-menu-item__wrapper"}
                        onClick={onCloseDrawer}
                        onKeyUp={onCloseDrawer}
                        tabIndex={0}
                        role="link"
                      >
                        {menuItem.title}
                      </div>
                    )}
                  </div>
                </li>
              )
            );
          })}
        </ul>
      </nav>
    );
  };

  return (
    <>
      {mobile ? (
        <StyledNavigation className={`wellms-component ${className}`}>
          <GlobalStyle />
          <div className="header">
            <Logo {...logo} />
            <IconsHeaderMobileWrapper>
              <IconsHeaderMobileWrapper>
                {props.cart}
                {props.notification}
                {props.profile}
              </IconsHeaderMobileWrapper>

              <span
                className="menu-button"
                onClick={() => setMobileMenuOpen(true)}
                onKeyUp={() => setMobileMenuOpen(true)}
                role="button"
                aria-label={t<string>("Navigation.ShowHideMenu")}
                tabIndex={0}
              >
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
              </span>
            </IconsHeaderMobileWrapper>
          </div>

          <Drawer
            open={mobileMenuOpen}
            className={"drawer drawer-header-wrapper"}
            // @ts-expect-error */}
            classNames={{
              wrapper: "drawer-content-wrapper custom-drawer-wrapper",
              content: "drawer-content",
            }}
          >
            <div className="drawer-header">
              {Object.keys(drawerSubmenuHistory).length > 0 ? (
                <div
                  className="drawer-nested-submenu-header-container"
                  onClick={() => onDrawerSubMenuBackClick()}
                  onKeyUp={() => onDrawerSubMenuBackClick()}
                  role="button"
                  tabIndex={0}
                >
                  <Row align={"center"}>
                    <Col xs={2}>
                      <div className="menu-drawer-prev">
                        <ArrowLeftIcon />
                      </div>
                    </Col>
                    <Col xs={8} className="drawer-nested-submenu-header">
                      <Text size="14" bold>
                        {
                          drawerSubmenuHistory[
                            Object.keys(drawerSubmenuHistory).length - 1
                          ].title
                        }
                      </Text>
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
            {search && (
              <div className="drawer-search">
                <React.Fragment>{search}</React.Fragment>
              </div>
            )}
            <div>{renderMobileMenu(currentMenuItems)}</div>
          </Drawer>
        </StyledNavigation>
      ) : (
        <></>
      )}
    </>
  );
};
