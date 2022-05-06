import * as React from "react";

import styled, { withTheme } from "styled-components";

import { getFontFromTheme } from "../../../theme/provider";

export interface OptionType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
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
  }

  &:hover input {
    border: 1px solid rgba(0, 0, 0, 0.4);
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
    background-color: ${(props) => props.theme.white};
    border-radius: ${(props) => props.theme.checkboxRadius || "0"}px;
    ${(props) => (props.type === "radio" ? "border-radius:100%" : "")};

    &:checked {
      border-color: ${(props) => props.theme.primaryColor};
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
    background: ${(props) => props.theme.primaryColor};
    opacity: 0;
    transition: opacity 0.5s;
    border-radius: ${(props) => (props.theme.checkboxRadius ? "2" : "0")}px;
    ${(props) => (props.type === "radio" ? "border-radius:100%" : "")}
  }

  input:checked::after {
    opacity: 1;
  }

  &:checked {
    opacity: 0.5;
  }
  color: ${(props) => props.theme.primaryColor};
`;

export const Option: React.FC<OptionType> = (props) => {
  const { label, type } = props;

  if (label) {
    return (
      <StyledDiv type={type}>
        <label>
          <input {...props} type={type} />
          <span>{label}</span>
        </label>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv type={type}>
      <input {...props} type={type} />
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewComponent = styled(Option)<{ type: "checkbox" | "radio" }>``;

export default withTheme(NewComponent);
