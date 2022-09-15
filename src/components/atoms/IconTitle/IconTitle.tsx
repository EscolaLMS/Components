import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { HeaderLevelInt, HeaderLevelStr } from "../../../types/titleTypes";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";

interface Styles {
  icon?: React.CSSProperties;
  title?: React.CSSProperties;
  subtitle?: React.CSSProperties;
  container?: React.CSSProperties;
}

interface StyledHeader {
  level?: HeaderLevelInt;
  mobile?: boolean;
  as: keyof JSX.IntrinsicElements;
}

export interface IconTitleProps
  extends StyledHeader,
    React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  styles?: Styles;
}

const StyledHeader = styled.h3<StyledHeader>`
  &.lms-icon-title {
    font-size: ${(props) =>
      setFontSizeByHeaderLevel(props.level, props.mobile)};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 0 20px 0;
    font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
    display: flex;
    flex-wrap: nowrap;
    color: ${(props) => {
      return props.theme.mode !== "light"
        ? props.theme.white
        : props.theme.gray1;
    }};
    .icon {
      width: 0.9em;
      display: flex;
      align-items: center;
      margin-right: 0.6em;
      svg {
        fill: ${(props) => {
          return props.theme.mode !== "light"
            ? props.theme.white
            : props.theme.black;
        }};
        max-width: 100%;
        height: auto;
        flex-shrink: 0;
      }
    }
    .title {
      font-weight: 700;
      margin-right: 0.4em;
    }
    .subtitle {
      font-size: 0.65em;
    }
  }
`;

export const IconTitle: React.FC<IconTitleProps> = (props) => {
  const { title, subtitle, icon, level = 3, styles } = props;
  const tagName: HeaderLevelStr = `h${level}`;
  return (
    <StyledHeader
      as={tagName}
      level={level}
      className="lms-icon-title wellms-component"
      style={styles?.container}
    >
      <span className="icon" style={styles?.icon} role="button">
        {icon}
      </span>
      <span className="full-title">
        <span className="title" style={styles?.title}>
          {title}
        </span>
        {subtitle && (
          <span className="subtitle" style={styles?.subtitle}>
            {subtitle}
          </span>
        )}
      </span>
    </StyledHeader>
  );
};

const NewComponent = styled(IconTitle)<StyledHeader>``;

export default withTheme(NewComponent);
