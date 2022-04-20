import * as React from "react";

import styled, {
  withTheme,
  ThemeProvider,
  ThemeContext,
} from "styled-components";

import { contrast } from "chroma-js";

import { getFontFromTheme } from "../../../theme/provider";

export interface TitleProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  level?: LevelInt;
  as: keyof JSX.IntrinsicElements;
}

type LevelInt = 1 | 2 | 3 | 4 | 5 | 6;
type LevelStr = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const StyledHeader = styled.h3<{}>`
  font-size: 16px;
  & > .range {
    height: 15px;
    position: relative;

    &:after {
      content: "";
      display: block;
      background: red;
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0p;
      top: 8px;
    }

    .knob-wrapper {
      width: calc(100% - 15px);
      position: relative;
    }
    .knob {
      width: 15px;
      height: 15px;
      background: red;
      position: absolute;
      transition: left 0.2s;
    }
  }
`;

export const IconTitle: React.FC<TitleProps> = (props) => {
  const { title, subtitle, icon, level = 3 } = props;
  const tagName: LevelStr = `h${level}`;
  return (
    <StyledHeader as={tagName}>
      <span className="icon">{icon}</span> {title}{" "}
      {subtitle && <small>{subtitle}</small>}
    </StyledHeader>
  );
};

const NewComponent = styled(IconTitle)<TitleProps>``;

export default withTheme(NewComponent);
