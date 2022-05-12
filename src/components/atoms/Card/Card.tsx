import * as React from "react";
import styled from "styled-components";

export interface CardProps {
  hideWings?: boolean;
  style?: React.CSSProperties;
}

const StyledCard = styled.div<CardProps>`
  position: relative;
  .content {
    position: relative;
    padding: 15px 20px;
    z-index: 2;
    ${(props) => {
      if (props.hideWings) {
        return `
          border-radius: ${props.theme.cardRadius}px;
        `;
      }
      return `
        border-bottom-left-radius: ${props.theme.cardRadius}px;
        border-bottom-right-radius: ${props.theme.cardRadius}px;
        border-top-left-radius: ${props.theme.cardRadius}px;
      `;
    }}
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray4 : props.theme.gray1};
    &:before,
    &:after {
      background: ${(props) => {
        if (props.hideWings) {
          return "transparent";
        }
        return props.theme.mode !== "dark"
          ? props.theme.gray4
          : props.theme.gray1;
      }};
      content: "";
      position: absolute;
      top: -30px;
      left: 0;
      width: 100%;
      height: 30px;
      opacity: 0.4;
    }
    &:before {
      clip-path: polygon(100% 50%, 100% 100%, 10% 100%);
    }
    &:after {
      clip-path: polygon(100% 0%, 100% 100%, 10% 100%);
      z-index: 1;
    }
  }
`;

export const Card: React.FC<CardProps> = ({ hideWings, children, style }) => {
  return (
    <StyledCard hideWings={hideWings} style={style}>
      <div className="content">{children}</div>
    </StyledCard>
  );
};
