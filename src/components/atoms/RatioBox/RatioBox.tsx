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
    display: block;
    width: 100%;
    height: 100%;
    &,
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: ${(props) => props.objectPosition || "center"};
      transition: transform 0.4s ease-out;
    }
  }

  & > a,
  & > button {
    cursor: pointer;
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
`;

export const RatioBox: React.FC<PropsWithChildren<RatioBoxProps>> = (props) => {
  const { children } = props;

  return (
    <StyledDiv className="wellms-component" {...props}>
      {children}
    </StyledDiv>
  );
};
