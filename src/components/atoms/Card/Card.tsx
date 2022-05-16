import * as React from "react";
import styled from "styled-components";

export interface CardProps {
  wingsSize?: "small" | "large";
  style?: React.CSSProperties;
  smallPadding?: boolean;
}

const StyledCard = styled.div<CardProps>`
  position: relative;
  .content {
    position: relative;
    padding: ${(props) => {
      if (props.smallPadding) {
        return "10px 13px";
      }
      return "15px 20px";
    }};
    z-index: 1;
    border-radius: ${(props) => props.theme.cardRadius}px;
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray4 : props.theme.gray1};
    &:before,
    &:after {
      background: ${(props) => {
        if (props.wingsSize) {
          return props.theme.mode !== "dark"
            ? props.theme.gray4
            : props.theme.gray1;
        }
        return "transparent";
      }};
      content: "";
      position: absolute;
      right: 0;
      width: ${(props) => {
        if (props.theme.cardRadius !== undefined) {
          return `calc(100% - ${props.theme.cardRadius / 1.5}px)`;
        }
        return "auto";
      }};
      opacity: 0.4;
      border-radius: ${(props) => props.theme.cardRadius}px;
      z-index: -1;
    }
    &:before {
      ${({ wingsSize }) => {
        if (wingsSize && wingsSize === "large") {
          return `
          height: calc(100% + 33px);
            top: -33px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 33px);
          `;
        }
        if (wingsSize && wingsSize === "small") {
          return `
            height: calc(100% + 10px);
            top: -10px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 10px);
          `;
        }
      }}
    }
    &:after {
      ${({ wingsSize }) => {
        if (wingsSize && wingsSize === "large") {
          return `
            height: calc(100% + 72px);
            top: -72px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 72px);
          `;
        }
        if (wingsSize && wingsSize === "small") {
          return `
            height: calc(100% + 22px);
            top: -22px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 22px);
          `;
        }
      }}
    }
  }
`;

export const Card: React.FC<CardProps> = ({
  wingsSize,
  children,
  style,
  smallPadding,
}) => {
  return (
    <StyledCard wingsSize={wingsSize} style={style} smallPadding={smallPadding}>
      <div className="content">{children}</div>
    </StyledCard>
  );
};
