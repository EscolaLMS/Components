import * as React from "react";
import ReactDropdown, { ReactDropdownProps } from "react-dropdown";
import styled from "styled-components";
import "react-dropdown/style.css";
import { getFontFromTheme } from "../../../theme/provider";
import chroma from "chroma-js";

const StyledDropdown = styled("div")`
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-size: 16px;
  min-width: 150px;

  .control {
    cursor: pointer;
    transition: none;
    border-color: transparent;
    color: ${({ theme }) =>
      theme.mode === "light" ? theme.gray2 : theme.gray4};
    padding: 8px 39px 8px 10px;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? theme.backgroundLight : theme.backgroundDark};
  }

  .is-open .control {
    border: 1px solid currentColor;
    border-bottom: none;
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
    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-menu {
    background-color: ${({ theme }) =>
      theme.mode === "light" ? theme.backgroundLight : theme.backgroundDark};
  }

  .Dropdown-option {
    padding: 7px 10px;
    color: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray2 : props.theme.gray4};
    &:hover {
      background: ${(props) =>
        props.theme.mode !== "dark"
          ? chroma(props.theme.backgroundLight).darken(0.5).hex()
          : chroma(props.theme.backgroundDark).brighten(1).hex()};
    }
    &.is-selected {
      background: ${(props) =>
        props.theme.mode !== "dark"
          ? chroma(props.theme.backgroundLight).darken(0.5).hex()
          : chroma(props.theme.backgroundDark).brighten(1).hex()};
    }
  }
  .menu {
    border: 1px solid currentColor;
    border-top: none;
    font-size: 16px;
  }
`;

export const Dropdown: React.FC<ReactDropdownProps> = (props) => {
  return (
    <StyledDropdown>
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
