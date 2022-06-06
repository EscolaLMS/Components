import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { Text } from "../Typography/Text";

interface StyledNoteProps {
  color?: string;
}

export interface NoteProps extends StyledNoteProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions: ReactNode;
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
  .title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.gray1};
  }
  .subtitle {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.gray3};
  }
`;

export const NoteAction: React.FC<NoteProps> = (props) => {
  const { title, subtitle, color, actions } = props;
  return (
    <StyledNote color={color}>
      <div>
        <Text className="title">{title}</Text>
        <Text className="subtitle">{subtitle}</Text>
      </div>
      <div>{actions}</div>
    </StyledNote>
  );
};
