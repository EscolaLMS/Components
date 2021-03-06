import React from "react";
import styled, { withTheme, css } from "styled-components";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import { Title, Text } from "../../../";

export interface ComponentProps {
  notification: NotificationProps;
  onClick: () => void;
  maxLengthDesc?: number;
  modularView?: boolean;
}

export interface NotificationProps {
  id: string;
  unread: boolean;
  title: string;
  description: string;
  dateTime: Date;
}

const StyledNotification = styled.section<{
  unread: boolean;
  modularView: boolean;
}>`
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) =>
    theme.mode === "light"
      ? theme.cardBackgroundColorDark
      : theme.cardBackgroundColorLight};
  display: flex;
  width: 100%;
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.cardRadius}px;
  padding: ${({ modularView }) => (modularView ? "0" : "23px 68px 24px 17px")};
  justify-content: ${(props) =>
    props.modularView ? "space-between" : "flex-start"};
  ${(props) =>
    props.unread &&
    css`
      &:before {
        content: "";
        display: block;
        width: 11px;
        height: 11px;
        margin-top: 3px;
        line-height: 19px;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.primaryColor};
        margin-right: 12px;
      }
    `}
  ${(props) =>
    props.modularView &&
    props.unread &&
    css`
      &:before {
        content: "";
        display: block;
        width: 11px;
        height: 11px;
        line-height: 19px;
        border-radius: 100%;
        position: absolute;
        background-color: ${({ theme }) => theme.primaryColor};
        top: 4px;
        margin-top: 0;
        left: -23px;
      }
    `}
    
  .date {
    display: inline-block;
    opacity: 0.8;
    min-width: 60px;
    text-align: left;
    margin-left: ${({ modularView }) => (modularView ? "38px" : "auto")};
  }
`;

export const Notification: React.FC<ComponentProps> = ({
  notification,
  onClick,
  maxLengthDesc,
  modularView = false,
}) => {
  const { unread, title, description, dateTime } = notification;

  return (
    <StyledNotification
      unread={unread}
      modularView={modularView}
      onClick={onClick}
    >
      <div>
        <Title
          level={5}
          style={{
            marginBottom: "6px",
          }}
        >
          {title}
        </Title>
        <Text size={"14"} noMargin>
          {maxLengthDesc && description.length > maxLengthDesc
            ? `${description.substring(0, maxLengthDesc)}...`
            : description}
        </Text>
      </div>
      <Text size={"12"} className={"date"}>
        {format(dateTime, isToday(dateTime) ? "hh:mm" : "dd.MM.yyyy")}
      </Text>
    </StyledNotification>
  );
};

export default withTheme(styled(Notification)<ComponentProps>``);
