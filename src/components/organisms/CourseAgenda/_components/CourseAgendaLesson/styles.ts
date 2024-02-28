import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../../../utils/utils";

export const StyledLessonItem = styled.li`
  background: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__background,
      theme.background
    )};
  padding: 5px 7px;
  overflow: hidden;
  border-radius: 3px;

  &.full-border {
    border: 1px solid ${({ theme }) => theme.primaryColor};
  }

  &.bottom-border {
    border-bottom: 1px solid ${({ theme }) => theme.gray3};
  }

  .duration {
    margin: 1px 0;
  }

  & > header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    button {

      svg {
        transition: transform 0.2s ease-in;
        transform: rotate(180deg);
      }
    }

    & > .lesson__header {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: calc(100% - 25px);
    }

    .lesson__details {
      flex-shrink: 0;
      margin-right: 10px;

      > p:first-child {
        margin-bottom: 2px;
        margin-top: 3px;
        text-transform: uppercase;
        color: ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )};
      }

      &--finished {
        > p:first-child {
          color: ${({ theme }) => theme.positive};
        }
      }
    }

    .lesson__title {
      font-size: 14px;
      color: ${(props) => props.theme.gray1};
      margin: 0;
      font-weight: bold;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      text-wrap: nowrap;

      small {
        font-size: 12px;
        font-weight: 300;
        .lesson__index {
          text-transform: uppercase;
          color: ${({ theme }) =>
            getStylesBasedOnTheme(
              theme.mode,
              theme.dm__primaryColor,
              theme.primaryColor,
              theme.primaryColor
            )};
          white-space: nowrap;
        }
        .lesson__duration {
          color: ${(props) => props.theme.gray2};
        }
        margin-right: 12px;
      }
    }

    .lesson__locked {
      color: ${({ theme }) => theme.primaryColor};
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
  &.open > header button svg {
    transform: rotate(0);
  }

  &.closed {
    cursor: pointer;
  }

  .lesson__lessons {
    padding-left: 0;
    list-style: none;
    padding: 3px 0;
  }

  .lesson__topics {
    display: grid;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: all 0.5s;
    gap: 3px;

    li:not(.lesson__overlay) {
      background: transparent;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;

      &:first-child {
        margin-top: 10px;
      }

      &:last-child:not(.lesson__topic--current) {
        padding-bottom: 0;
        border-bottom: none;
      }

      &:hover p:last-child {
        text-decoration: underline;
      }

      .lesson__description {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid ${({ theme }) => theme.gray3};
        border-radius: 3px;
        padding: 10px 15px;

        svg {
          margin-right: 7px;
          width: 17px;
          flex-shrink: 0;

          &.current-icon path {
            fill: ${({ theme }) =>
              getStylesBasedOnTheme(
                theme.mode,
                theme.dm__primaryColor,
                theme.primaryColor,
                theme.primaryColor
              )};
          }
        }

        .lesson__index {
          opacity: ${(props) =>
            props.theme.dm__numerationsColor || props.theme.numerationsColor
              ? 1
              : 0.5};
          margin-right: 4px;
        }
      }

      &.lesson__topic--current {
        background: ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__inputBg,
            theme.inputBg,
            theme.gray1
          )};
        cursor: default;
        button {
          margin-top: 10px;
          border-width: 1px;
          font-weight: normal;
        }
        &:not(.lesson__overlay):hover,
        .lesson__description p:last-child {
          text-decoration: none;
        }

        .lesson__description {
          border-color: ${({ theme }) => theme.primaryColor};
        }

        svg {
          margin-top: 2px;
        }
      }

      &.lesson__topic--locked {
        cursor: not-allowed;
        opacity: 0.55;
      }
    }
  }

  &.open > .lesson__topics {
    transition: all 0.35s ease-in;

    &--locked {
      min-height: 64px;
    }
  }

  &.closed > .lesson__topics,
  &.closed > .lesson__lessons {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s ease-out;
  }

  .lesson__header {
    flex-grow: 1;
    display: flex;

    &--inactive {
      opacity: 0.55;
    }
  }
`;
