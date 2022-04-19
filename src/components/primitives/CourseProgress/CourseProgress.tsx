import * as React from "react";

import styled, {
  withTheme,
  ThemeProvider,
  ThemeContext,
} from "styled-components";

import { contrast } from "chroma-js";

import { getFontFromTheme } from "../../../theme/provider";

export interface TitleProps {
  progress: number;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const StyledDiv = styled.dl<TitleProps>`
  font-size: 16px;
  & > .range {
    height: 15px;
    position: relative;

    &:after {
      content: "";
      display: block;
      background: red;
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0p;
      top: 8px;
    }

    .knob-wrapper {
      width: calc(100% - 15px);
      position: relative;
    }
    .knob {
      width: 15px;
      height: 15px;
      background: red;
      position: absolute;
      transition: left;
    }
  }
`;

export const CourseProgress: React.FC<TitleProps> = (props) => {
  const { title, children, icon, progress } = props;

  return (
    <StyledDiv {...props}>
      <div className="header">
        {icon && <div className="icon">{icon}</div>}
        {title}
      </div>

      <div className="range">
        <div className="knob-wrapper">
          <div className="knob" style={{ left: `${100 * progress}%` }}></div>
        </div>
      </div>

      <div className="description">{children}</div>
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewComponent = styled(CourseProgress)<TitleProps>``;

// Main button with styles
export default withTheme(NewComponent);
