import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { Text } from "../Typography/Text";

interface StyledNoteProps {
  color?: string;
}

export interface NoteProps extends StyledNoteProps {
  description: ReactNode;
  time?: ReactNode;
}

const StyledNote = styled("div")<StyledNoteProps>`
  border-left: 3px solid ${(props) => (props.color ? props.color : "#F2C94C")};
  padding: 20px;
  display: flex;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: ${(props) => props.theme.cardRadius}px;
  background: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.cardBackgroundColor
    )};
  .description {
    margin: 0;
    font-size: 14px;
  }
  .time {
    margin: 0 0 0 20px;
    font-size: 14px;
  }
`;

export const Note: React.FC<NoteProps> = (props) => {
  const { description, time, color } = props;
  return (
    <StyledNote className="wellms-component" color={color}>
      <Text className="description">{description}</Text>
      <Text className="time">{time}</Text>
    </StyledNote>
  );
};
