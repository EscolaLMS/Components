import * as React from "react";
import styled from "styled-components";
import { calcPercentage } from "../../../utils/utils";

export interface IntervalProps {
  current: number;
  max: number;
}

const StyledInterval = styled.div<IntervalProps>`
  position: relative;
  margin: 15px 8px;
  height: 1px;
  background: ${(props) =>
    props.theme.mode !== "dark" ? props.theme.gray3 : props.theme.gray4};
  &:before {
    content: "";
    position: absolute;
    left: -8px;
    height: 1px;
    width: 8px;
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray3 : props.theme.gray4};
  }
  &:after {
    content: "";
    position: absolute;
    right: -8px;
    height: 1px;
    width: 8px;
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray3 : props.theme.gray4};
  }
  > div {
    position: absolute;
    top: -3px;
    height: 7px;
    background: ${(props) => props.theme.primaryColor};
    width: ${({ max, current }) => {
      return `${calcPercentage(current, max)}`;
    }};
    border-radius: ${(props) => props.theme.buttonRadius}px;
  }
`;

export const Interval: React.FC<IntervalProps> = (props) => {
  return (
    <StyledInterval {...props}>
      <div></div>
    </StyledInterval>
  );
};
