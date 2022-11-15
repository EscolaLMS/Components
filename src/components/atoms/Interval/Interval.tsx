import * as React from "react";
import styled from "styled-components";
import { calcPercentage, getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

export interface IntervalProps extends ExtendableStyledComponent {
  current: number;
  max: number;
}

const StyledInterval = styled.div<IntervalProps>`
  position: relative;
  margin: 15px 8px;
  height: 1px;
  background: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.gray4, theme.gray3)};
  &:before {
    content: "";
    position: absolute;
    left: -8px;
    height: 1px;
    width: 8px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.gray4, theme.gray3)};
  }
  &:after {
    content: "";
    position: absolute;
    right: -8px;
    height: 1px;
    width: 8px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.gray4, theme.gray3)};
  }
  > div {
    position: absolute;
    top: -3px;
    height: 7px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
    width: ${({ max, current }) => {
      return `${calcPercentage(current, max)}`;
    }};
    border-radius: ${(props) => props.theme.buttonRadius}px;
  }
`;

export const Interval: React.FC<IntervalProps> = (props) => {
  return (
    <StyledInterval
      {...props}
      className={`wellms-component ${props.className ?? ""}`}
    >
      <div></div>
    </StyledInterval>
  );
};
