import * as React from "react";

import styled, { withTheme } from "styled-components";
import theme from "theme";
import { getFontFromTheme } from "../../../theme/provider";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  helper?: React.ReactNode;
  type: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
}

// Main button with styles
const StyledDiv = styled("div")<InputProps>`
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  input {
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  }
`;

// Main button with styles
export const Input: React.FC<InputProps> = ({
  label,
  helper,
  type,
  ...props
}) => {
  if (label) {
    return (
      <StyledDiv type={type}>
        <label>
          <span>{label}</span>
          <input type={type} {...Object.assign(props, { theme: undefined })} />
          {helper && <span>{helper}</span>}
        </label>
      </StyledDiv>
    );
  }
  return (
    <StyledDiv type={type}>
      <input type={type} {...props} />
    </StyledDiv>
  );
};

const NewInput = styled(Input)<InputProps>``;

export default withTheme(NewInput);
