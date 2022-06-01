import * as React from "react";
import styled, { withTheme } from "styled-components";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  path?: string;
  url?: string;
}

const StyledDiv = styled("div")<InputProps>`
  &.lsm-input {
    display: block;
  }
`;

export const Upload: React.FC<InputProps> = (props) => {
  return (
    <StyledDiv>
      <input type="file" {...props} />
    </StyledDiv>
  );
};

export default withTheme(styled(Upload)<InputProps>``);
