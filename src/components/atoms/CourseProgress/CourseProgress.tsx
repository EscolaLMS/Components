import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { PropsWithChildren } from "react";

export interface TitleProps {
  progress: number;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  logged?: boolean;
}

const StyledDiv = styled.div<TitleProps>`
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  color: ${(props) =>
    props.theme.mode !== "dark" ? props.theme.gray1 : props.theme.white};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .header {
    display: flex;
    align-items: center;
    svg {
      fill: ${(props) =>
        props.theme.mode !== "dark" ? props.theme.gray1 : props.theme.white};
    }
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-left: ${(props) => (props.icon ? "11px" : 0)};
  }
  .description {
    &,
    & > * {
      font-size: 12px;
    }

    a {
      color: ${({ theme }) =>
        theme.mode === "light" ? theme.primaryColor : theme.white};

      &:after {
        background-color: currentColor;
      }
    }
  }
  & > .range {
    height: 15px;
    position: relative;
    margin: 22px 0 20px 0;
    &:before {
      content: "";
      display: block;
      background: ${(props) => {
        return props.theme.mode !== "light"
          ? props.theme.white
          : props.theme.gray3;
      }};
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0px;
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

export const CourseProgress: React.FC<PropsWithChildren<TitleProps>> = (
  props
) => {
  const { title, children, icon, progress } = props;

  return (
    <StyledDiv {...props} className="wellms-component">
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

export default withTheme(styled(CourseProgress)<TitleProps>``);
