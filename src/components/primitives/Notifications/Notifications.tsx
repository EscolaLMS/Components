import React, { useCallback, useEffect, useRef, useState } from "react";
import { getFontFromTheme } from "../../../theme/provider";
import styled, { withTheme } from "styled-components";
import Notification, { NotificationProps } from "./Notification";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export interface ComponentProps {
  notifications: NotificationProps[];
  showAllLink?: string;
}

const StyledWrapper = styled.span`
  position: relative;
`;

const StyledIcon = styled.span`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  svg {
    path {
      fill: ${({ theme }) =>
        theme.mode === "light" ? theme.textColorLight : theme.textColorDark};
      transition: fill 0.4s;
    }
  }
  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.secondaryColor};
      }
    }
  }
  i {
    position: absolute;
    top: 1px;
    right: -5px;
    font-family: ${({ theme }) => getFontFromTheme(theme).fontFamily};
    color: #fff;
    font-style: normal;
    font-size: 10px;
    line-height: 15px;
    display: block;
    text-align: center;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.primaryColor};
    letter-spacing: -1px;
  }
`;

const StyledNotifications = styled.section`
  position: absolute;
  right: 0;
  top: 45px;
  z-index: 9999;
  > div {
    position: relative;
    width: 585px;
    padding: 48px 30px 38px 38px;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? theme.backgroundLight : theme.backgroundDark};
    &:before {
      position: absolute;
      top: -20px;
      right: 0;
      content: "";
      width: 0;
      height: 0;
      border-top: 60px solid transparent;
      border-bottom: 60px solid transparent;
      border-right: 80px solid
        ${({ theme }) =>
          theme.mode === "light"
            ? theme.backgroundLight
            : theme.backgroundDark};
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 42px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const StyledNotificationsHeader = styled.div`
  position: relative;
  padding-bottom: 23px;
  border-bottom: 1px solid ${({ theme }) => theme.textColorDark};
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h5 {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin: 0;
  }
`;

const StyledNoNotifications = styled.p`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
`;

const StyledLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColorLight};
  transition: color 0.4s;
  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    svg path {
      fill: ${({ theme }) => theme.primaryColor};
    }
  }
  svg {
    margin-left: 8px;
    path {
      transition: fill 0.4s;
    }
  }
`;

export const Notifications: React.FC<ComponentProps> = (props) => {
  const { notifications, showAllLink } = props;
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useOnClickOutside(ref, () => setActive(false));

  useEffect(() => {
    setUnreadCount(notifications.filter((item) => item.unread).length);
  }, [notifications]);

  // TODO click handling
  const onCLickNotification = useCallback(() => {
    console.log("click");
  }, []);

  // TODO add react-i18n
  return (
    <StyledWrapper>
      <StyledIcon onClick={() => setActive(!active)}>
        <svg
          width="19"
          height="22"
          viewBox="0 0 19 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.5548 20H11.5548C11.5548 20.5304 11.3441 21.0391 10.969 21.4142C10.5939 21.7893 10.0852 22 9.5548 22C9.02437 22 8.51566 21.7893 8.14059 21.4142C7.76552 21.0391 7.5548 20.5304 7.5548 20ZM0.630803 17.383C0.555099 17.2002 0.535308 16.9991 0.573935 16.8051C0.612562 16.6111 0.707871 16.4328 0.847803 16.293L2.5548 14.586V9C2.55802 7.3185 3.16589 5.69424 4.26744 4.42379C5.36899 3.15334 6.89073 2.32145 8.5548 2.08V1C8.5548 0.734784 8.66016 0.48043 8.8477 0.292893C9.03523 0.105357 9.28959 0 9.5548 0C9.82002 0 10.0744 0.105357 10.2619 0.292893C10.4494 0.48043 10.5548 0.734784 10.5548 1V2.08C12.2189 2.32145 13.7406 3.15334 14.8422 4.42379C15.9437 5.69424 16.5516 7.3185 16.5548 9V14.586L18.2618 16.293C18.4016 16.4329 18.4968 16.611 18.5354 16.805C18.574 16.9989 18.5542 17.2 18.4785 17.3827C18.4028 17.5654 18.2747 17.7215 18.1103 17.8314C17.9459 17.9413 17.7526 18 17.5548 18H1.5548C1.35704 18 1.1637 17.9415 0.999229 17.8316C0.83476 17.7218 0.706548 17.5657 0.630803 17.383ZM3.9688 16H15.1408L14.8478 15.707C14.6603 15.5195 14.5549 15.2652 14.5548 15V9C14.5548 7.67392 14.028 6.40215 13.0903 5.46447C12.1527 4.52678 10.8809 4 9.5548 4C8.22872 4 6.95695 4.52678 6.01927 5.46447C5.08159 6.40215 4.5548 7.67392 4.5548 9V15C4.55475 15.2652 4.44935 15.5195 4.2618 15.707L3.9688 16Z" />
        </svg>
        {unreadCount > 0 && <i>{unreadCount}</i>}
      </StyledIcon>

      {active && (
        <StyledNotifications ref={ref}>
          <div>
            <StyledNotificationsHeader>
              <h5>Powiadomienia</h5>
              {showAllLink && (
                <StyledLink href={showAllLink}>
                  Pokaż wszystkie
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.57261 9.77578C5.3383 10.0101 5.3383 10.39 5.57261 10.6243C5.80692 10.8586 6.18682 10.8586 6.42114 10.6243L10.6211 6.42431C10.8555 6.19 10.8555 5.8101 10.6211 5.57579L6.42114 1.37579C6.18682 1.14147 5.80693 1.14147 5.57261 1.37579C5.3383 1.6101 5.3383 1.99 5.57261 2.22431L8.74834 5.40005L1.79688 5.40005C1.46551 5.40005 1.19688 5.66867 1.19688 6.00004C1.19688 6.33142 1.46551 6.60004 1.79688 6.60004L8.74835 6.60005L5.57261 9.77578Z"
                      fill="black"
                    />
                  </svg>
                </StyledLink>
              )}
            </StyledNotificationsHeader>
            {notifications.length ? (
              <ul>
                {notifications.map((item) => (
                  <li key={item.id}>
                    <Notification
                      notification={item}
                      onClick={() => onCLickNotification()}
                      maxLengthDesc={120}
                      modularView
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <StyledNoNotifications>
                Brak Nowych powiadomień
              </StyledNoNotifications>
            )}
          </div>
        </StyledNotifications>
      )}
    </StyledWrapper>
  );
};

const NewNotifications = styled(Notifications)<ComponentProps>``;

export default withTheme(NewNotifications);
