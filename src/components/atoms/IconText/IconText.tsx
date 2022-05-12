import * as React from "react";
import styled, { withTheme } from "styled-components";
import { getFontFromTheme } from "../../../theme/provider";

interface Styles {
  icon?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface IconTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  icon: React.ReactNode;
  text: string;
  styles?: Styles;
}

const StyledText = styled("p")<IconTextProps>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 0 20px 0;
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: ${(props) => {
    return props.theme.mode !== "light" ? props.theme.white : props.theme.gray1;
  }};

  .icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    margin-right: 9px;
    svg {
      flex-shrink: 0;
    }
  }
`;

export const IconText: React.FC<IconTextProps> = (props) => {
  const { text, icon, styles } = props;

  return (
    <StyledText {...props}>
      <span className="icon" style={styles?.icon}>
        {icon}
      </span>
      <span className="title" style={styles?.text}>
        {text}
      </span>
    </StyledText>
  );
};

const NewComponent = styled(IconText)<IconTextProps>``;

export default withTheme(NewComponent);
