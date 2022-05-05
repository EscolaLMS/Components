import * as React from "react";

import styled, {
  withTheme,
  ThemeProvider,
  ThemeContext,
} from "styled-components";

import { contrast } from "chroma-js";

import { getFontFromTheme } from "../../../theme/provider";

export interface TitleProps {
  mode?: "header" | "label";
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const StyledDiv = styled.dl<TitleProps>`
  font-size: ${(props) => (props.mode === "header" ? "20px" : "12px")};
`;

export const LabelListItem: React.FC<TitleProps> = (props) => {
  const { title, children, icon } = props;

  return (
    <StyledDiv {...props}>
      <dt>
        {icon && <div className="icon">{icon}</div>}
        {title}
      </dt>
      <dd>{children}</dd>
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewComponent = styled(LabelListItem)<TitleProps>``;

// Main button with styles
export default withTheme(NewComponent);
