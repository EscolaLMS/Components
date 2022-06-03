import * as React from "react";
import styled from "styled-components";
import { PropsWithChildren } from "react";

export interface RatioBoxProps {
  ratio: number;
  objectPosition?: React.CSSProperties["objectPosition"];
}

const StyledDiv = styled("div")<RatioBoxProps>`
  overflow: hidden;
  height: 0;
  padding-top: ${(props) => props.ratio * 100}%;
  width: 100%;
  position: relative;
  & > * {
    left: 0;
    top: 0;
    position: absolute;
    object-fit: cover;
    object-position: ${(props) => props.objectPosition || "center"};
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const RatioBox: React.FC<PropsWithChildren<RatioBoxProps>> = (props) => {
  const { children } = props;

  return <StyledDiv {...props}>{children}</StyledDiv>;
};
