import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

import { getFontFromTheme } from "../../../theme/provider";

export interface OptionType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    ExtendableStyledComponent {
  label?: React.ReactNode;
  type: "checkbox" | "radio";
}

const StyledDiv = styled.div<OptionType>`
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-size: 16px;
  color: #4a4a4a;

  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  span {
    margin-left: 15px;
    color: ${(props) =>
      getStylesBasedOnTheme(props.theme.mode, props.theme.white, "#111")};
  }

  input {
    cursor: pointer;
    transition: border-color 0.5s;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 0;
    flex-shrink: 0;
    background-color: ${(props) => props.theme.white};
    border-radius: ${(props) => props.theme.checkboxRadius || "0"}px;
    ${(props) => (props.type === "radio" ? "border-radius:100%" : "")};

    &:checked {
      border-color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          theme.primaryColor
        )};
    }
  }

  input::after {
    content: "";
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 12px;
    height: 12px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
    opacity: 0;
    transition: opacity 0.5s;
    border-radius: ${(props) => (props.theme.checkboxRadius ? "2" : "0")}px;
    ${(props) => (props.type === "radio" ? "border-radius:100%;" : "")}
  }

  &:hover input {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  input:checked::after {
    opacity: 1;
  }

  &:checked {
    opacity: 0.5;
  }
  color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__primaryColor,
      theme.primaryColor,
      theme.primaryColor
    )};
`;

export const Option: React.FC<OptionType> = (props) => {
  const { label, type, className = "" } = props;

  if (label) {
    return (
      <StyledDiv
        type={type}
        className={`wellms-component lms-${type} ${className}`}
      >
        <label>
          <input {...props} type={type} />
          <span>{label}</span>
        </label>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv className="wellms-component" type={type}>
      <input {...props} type={type} />
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewComponent = styled(Option)<{ type: "checkbox" | "radio" }>``;

export default withTheme(NewComponent);
