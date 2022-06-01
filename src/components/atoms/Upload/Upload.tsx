import * as React from "react";
import styled, { withTheme } from "styled-components";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  path?: string;
  url?: string;
}

const StyledDiv = styled("div")<InputProps>`
  &.lsm-input {
  }
`;

export const Upload: React.FC<InputProps> = (props) => {
  // const { label, helper, container, error, required } = props;

  /*
  const generateRandomInputId = useMemo(() => {
    const randomString = (Math.random() + 1).toString(36).substring(3);
    return `lms-input-id-${randomString}`;
  }, []);
  */

  return (
    <StyledDiv>
      <input type="file" {...props} />
    </StyledDiv>
  );
};

export default withTheme(styled(Upload)<InputProps>``);
