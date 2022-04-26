import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
export interface TitleProps {
  progress: number;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const StyledDiv = styled.div<TitleProps>`
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  color: ${(props) => props.theme.mode !== "dark" ? props.theme.body.gray1 : props.theme.body.white};
  .header {
    display: flex;
    align-items: center;
    svg {
      fill: ${(props) => props.theme.mode !== "dark" ? props.theme.body.gray1 : props.theme.body.white};
    }
  }
  .title {
    margin-left: ${(props) => props.icon ? "16px": 0};
  }
  & > .range {
    height: 15px;
    position: relative;
    margin: 20px 0;
    &:before {
      content: "";
      display: block;
      background: ${(props) => {
        return props.theme.mode !== "dark" ? props.theme.body.gray3 : props.theme.body.white
      }};
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0p;
      top: 8px;
    }
    &:after {
      content: "";
      position: absolute;
      display: inline-block;
      height: 3px;
      left: 0;
      top: 7px;
      transition: width 0.2s;
      background: ${(props) => props.theme.primaryColor};
      width: ${(props) => `${100 * props.progress}%`};
    }
    .knob-wrapper {
      width: calc(100% - 15px);
      position: relative;
    }
    .knob {
      width: 15px;
      height: 15px;
      background: ${(props) => props.theme.primaryColor};
      position: absolute;
      transition: left 0.2s;
      border-radius: ${(props) => props.theme.buttonRadius || 0}px;
    }
  }
`;

export const CourseProgress: React.FC<TitleProps> = (props) => {
  const { title, children, icon, progress } = props;

  return (
    <StyledDiv {...props}>
      <div className="header">
        {icon}
        <span className="title">{title}</span> 
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
