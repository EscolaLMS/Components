import React from "react";
import styled, { withTheme } from "styled-components";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import { Icon, Text } from "../../../";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

export interface ComponentProps extends ExtendableStyledComponent {
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

const StyledNotification = styled.div<{
  unread: boolean;
  modularView: boolean;
}>`
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.white
    )};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.cardRadius}px;
  padding: 7px 12px;
  justify-content: flex-start;
  p {
    margin: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    button {
      all: unset;
      cursor: pointer;
      svg {
        width: 10px;
        height: 10px;

        path {
          fill: ${({ theme }) => theme.textColor};
        }
      }
    }
    p {
      margin: 0;
    }
  }
  .date {
    display: inline-block;
    opacity: 0.8;
    min-width: 60px;
    text-align: left;
    margin-left: ${({ modularView }) => (modularView ? "38px" : "auto")};
  }
  .content {
    * {
      word-break: break-word;
    }
  }
`;

export const Notification: React.FC<ComponentProps> = ({
  notification,
  onClick,
  maxLengthDesc,
  modularView = false,
  className = "",
}) => {
  const { unread, title, description, dateTime } = notification;

  return (
    <StyledNotification
      className={`wellms-component ${className}`}
      unread={unread}
      modularView={modularView}
    >
      <div className="header">
        <Text size={"12"} className={"date"}>
          {format(dateTime, isToday(dateTime) ? "hh:mm" : "dd.MM.yyyy")}
        </Text>
        <button onClick={onClick} title={"notification-read"}>
          <Icon name="close" />
        </button>
      </div>
      <div className="content">
        <Text size="13" bold={unread}>
          {title}
        </Text>
        <Text size={"14"} noMargin>
          {maxLengthDesc && description.length > maxLengthDesc
            ? `${description.substring(0, maxLengthDesc)}...`
            : description}
        </Text>
      </div>
    </StyledNotification>
  );
};

export default withTheme(styled(Notification)<ComponentProps>``);
