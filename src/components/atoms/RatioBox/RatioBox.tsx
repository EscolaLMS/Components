import * as React from "react";
import styled from "styled-components";
import { PropsWithChildren } from "react";
import { ExtendableStyledComponent } from "types/component";

export interface RatioBoxProps extends ExtendableStyledComponent {
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
    <StyledDiv
      {...props}
      className={`wellms-component ${props.className ?? ""}`}
    >
      {children}
    </StyledDiv>
  );
};
