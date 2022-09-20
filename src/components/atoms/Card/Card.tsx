import * as React from "react";
import { PropsWithChildren } from "react";

import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";

export interface CardProps {
  // size of wings for a card
  wings?: "small" | "large" | "hidden";
  // overwrite default css style
  style?: React.CSSProperties;
  // block or inline
  inline?: boolean;
}

const StyledCard = styled.div<CardProps>`
  width: ${(props) => (props.inline ? "auto" : "100%")};
  display: ${(props) => (props.inline ? "inline-block" : "block")};

  position: relative;

  padding-top: ${(props) => {
    switch (props.wings) {
      case "large":
        return "73px";
      case "small":
        return "22px";
      case "hidden":
      default:
        return "0";
    }
  }};
  .content {
    position: relative;
    padding: ${(props) => {
      if (props.inline) {
        return "10px 15px";
      }
      return "15px 20px";
    }};
    z-index: 1;
    border-radius: ${(props) => props.theme.cardRadius}px;
    background: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__cardBackgroundColor,
        theme.cardBackgroundColor
      )};
    color: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
    &:before,
    &:after {
      background: ${({ wings, theme }) => {
        if (wings) {
          return getStylesBasedOnTheme(
            theme.mode,
            theme.dm__cardBackgroundColor,
            theme.cardBackgroundColor
          );
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
      ${({ wings }) => {
        if (wings && wings === "large") {
          return `
          height: calc(100% + 33px);
            top: -33px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 33px);
          `;
        }
        if (wings && wings === "small") {
          return `
            height: calc(100% + 10px);
            top: -10px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 10px);
          `;
        }
      }}
    }
    &:after {
      ${({ wings }) => {
        if (wings && wings === "large") {
          return `
            height: calc(100% + 72px);
            top: -72px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 72px);
          `;
        }
        if (wings && wings === "small") {
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

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  wings,
  children,
  style,
  inline,
}) => {
  return (
    <StyledCard
      wings={wings}
      style={style}
      inline={inline}
      className="wellms-component"
    >
      <div className="content">{children}</div>
    </StyledCard>
  );
};
