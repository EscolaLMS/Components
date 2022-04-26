import React from "react";
import { ThemeContext } from "styled-components";

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const ModeContainer: React.FC<Props> = ({children, style}: Props) => {
  const theme = React.useContext(ThemeContext);
  return (
    <div 
      style={{
        background: theme.mode !== 'light' ? "#4A4A4A" : "#E4E4E4",
        padding: 25,
        margin: "12px 0",
        ...style
    }}
    >
      {children}
    </div>
  );
}