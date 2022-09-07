import * as React from "react";
import ReactDropdown, { ReactDropdownProps } from "react-dropdown";
import styled, { ThemeContext } from "styled-components";
import "react-dropdown/style.css";
import { getFontFromTheme } from "../../../theme/provider";
import chroma, { contrast } from "chroma-js";

export interface DropdownProps extends ReactDropdownProps {
  placement?: "top" | "bottom";
  styles?: React.CSSProperties;
  lightContrast?: boolean;
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

const StyledDropdown = styled("div")<{
  placement?: "top" | "bottom";
  lightContrast: boolean;
  backgroundColor: React.CSSProperties["backgroundColor"];
}>`
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-size: 16px;
  min-width: 150px;

  .control {
    cursor: pointer;
    transition: none;
    border-color: transparent;
    color: ${(props) =>
      props.lightContrast ? props.theme.gray4 : props.theme.gray2};
    padding: 7px 39px 7px 10px;
    background-color: ${(props) => props.backgroundColor};

    &:after {
      position: absolute;
      content: "";
      bottom: ${(props) => (props.placement === "bottom" ? "0" : "96%")};
      left: 10px;
      width: calc(100% - 20px);
      background: ${(props) => props.backgroundColor};
    }
  }

  .is-open .control {
    border-color: currentColor;
    border-bottom: ${(props) => props.placement === "bottom" && "none"};
    border-top: ${(props) => props.placement === "top" && "none"};
    border-radius: ${({ placement, theme }) =>
      placement === "bottom"
        ? `${theme.inputRadius}px ${theme.inputRadius}px 0 0`
        : `0 0 ${theme.inputRadius}px ${theme.inputRadius}px`};

    &:after {
      height: 1px;
    }
  }

  .Dropdown-arrow-wrapper {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.2s ease-in-out;
  }

  &:hover .arrows {
    opacity: 0.6;
  }

  .Dropdown-control {
    border-radius: ${({ theme }) => theme.inputRadius}px;

    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-menu {
    top: ${(props) => (props.placement === "top" ? "auto" : "100%")};
    bottom: ${(props) => (props.placement === "top" ? "100%" : "auto")};
    border-color: ${(props) =>
      props.lightContrast ? props.theme.gray4 : props.theme.gray2};
    border-top: ${(props) => props.placement === "bottom" && "none"};
    border-bottom: ${(props) => props.placement === "top" && "none"};
    box-shadow: none;
    background-color: ${(props) => props.backgroundColor};
    font-size: 14px;
    border-radius: ${({ placement, theme }) =>
      placement === "bottom"
        ? `0 0 ${theme.inputRadius}px ${theme.inputRadius}px`
        : `${theme.inputRadius}px ${theme.inputRadius}px 0 0`};
  }

  .Dropdown-option {
    padding: 7px 10px;
    color: ${(props) =>
      props.lightContrast ? props.theme.gray4 : props.theme.gray2};
    &:hover {
      background: ${(props) =>
        props.lightContrast
          ? chroma(props.theme.white).alpha(0.3).hex()
          : chroma(props.theme.black).alpha(0.2).hex()};
    }
    &.is-selected {
      background: ${(props) =>
        props.lightContrast
          ? chroma(props.theme.white).alpha(0.3).hex()
          : chroma(props.theme.black).alpha(0.3).hex()};
    }
  }
`;

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const theme = React.useContext(ThemeContext);
  const {
    placement = "bottom",
    styles,
    backgroundColor = theme.mode === "light"
      ? theme.backgroundLight
      : theme.backgroundDark,
  } = props;

  const cts = React.useMemo(() => {
    return contrast("#fff", backgroundColor) >= 1.85;
  }, [backgroundColor]);

  return (
    <StyledDropdown
      className="wellms-component"
      placement={placement}
      style={styles}
      lightContrast={cts}
      backgroundColor={backgroundColor}
    >
      <ReactDropdown
        {...props}
        menuClassName="menu"
        controlClassName="control"
        arrowOpen={
          <svg
            className="arrows"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z"
              fill="currentColor"
            />
          </svg>
        }
        arrowClosed={
          <svg
            className="arrows"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"
              fill="currentColor"
            />
          </svg>
        }
      />
    </StyledDropdown>
  );
};
