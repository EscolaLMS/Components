import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";
import { ReactNode } from "react";
import { getStylesBasedOnTheme } from "../../../utils/utils";

interface Styles {
  icon?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface IconTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  icon: ReactNode;
  text: string;
  styles?: Styles;
  noMargin?: boolean;
}

const StyledText = styled("p")<IconTextProps>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: ${({ noMargin }) => (noMargin ? "0" : "0 0 20px 0")};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};

  .icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    margin-right: 9px;

    svg {
      flex-shrink: 0;
      fill: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.black)};
    }
  }
`;

export const IconText: React.FC<IconTextProps> = (props) => {
  const { text, icon, styles } = props;

  return (
    <StyledText {...props} className="wellms-component">
      <span className="icon" style={styles?.icon}>
        {icon}
      </span>
      <span className="text" style={styles?.text}>
        {text}
      </span>
    </StyledText>
  );
};

const NewComponent = styled(IconText)<IconTextProps>``;

export default withTheme(NewComponent);
