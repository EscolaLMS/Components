import React from "react";
import { getFontFromTheme } from "../../../theme/provider";
import styled, { withTheme, css } from "styled-components";
import format from "date-fns/format";
import isToday from "date-fns/isToday";

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
  font-family: ${({ theme }) => getFontFromTheme(theme).fontFamily};
  background-color: ${({ theme }) =>
    theme.mode === "light" ? theme.backgroundLight : theme.backgroundDark};
  display: flex;
  width: 100%;
  align-items: flex-start;
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
`;

const StyledTitle = styled.h5`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 0;
  margin-bottom: 7px;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
`;

const StyledDate = styled.span<{
  modularView: boolean;
}>`
  font-size: 12px;
  line-height: 14px;
  font-weight: 300;
  display: inline-block;
  min-width: 60px;
  text-align: left;
  margin-left: ${({ modularView }) => (modularView ? "38px" : "auto")};
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
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>
          {maxLengthDesc && description.length > maxLengthDesc
            ? `${description.substring(0, maxLengthDesc)}...`
            : description}
        </StyledDescription>
      </div>
      <StyledDate modularView={modularView}>
        {format(dateTime, isToday(dateTime) ? "hh:mm" : "dd.MM.yyyy")}
      </StyledDate>
    </StyledNotification>
  );
};

const NewNotification = styled(Notification)<ComponentProps>``;

export default withTheme(NewNotification);
