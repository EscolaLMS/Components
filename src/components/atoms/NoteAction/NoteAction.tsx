import * as React from "react";
import { ReactNode } from "react";
import styled, { useTheme } from "styled-components";
import Spin from "../Spin/Spin";

interface StyledNoteProps {
  color?: string;
}

export interface NoteProps extends StyledNoteProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions: ReactNode;
  loading?: boolean;
}

const StyledNote = styled("div")<StyledNoteProps>`
  border-left: 3px solid ${(props) => (props.color ? props.color : "#F2C94C")};
  padding: 20px;
  display: flex;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-radius: ${(props) => props.theme.cardRadius}px;
  background: ${({ theme }) =>
    theme.mode === "light"
      ? theme.cardBackgroundColorDark
      : theme.cardBackgroundColorLight};
  > div:first-child {
    padding-right: 30px;
  }

  .subtitle {
    opacity: 0.8;
  }
`;

export const NoteAction: React.FC<NoteProps> = (props) => {
  const { title, subtitle, color, actions, loading } = props;
  const theme = useTheme();
  return (
    <StyledNote color={color}>
      <div>
        <div>{title}</div>
        {subtitle && <div className={"subtitle"}>{subtitle}</div>}
      </div>
      {loading ? <Spin color={theme.secondaryColor} /> : <div>{actions}</div>}
    </StyledNote>
  );
};
