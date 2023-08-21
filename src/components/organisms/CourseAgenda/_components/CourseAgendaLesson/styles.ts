import chroma from "chroma-js";
import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../../../utils/utils";

export const StyledLessonItem = styled.li`
  background: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.cardBackgroundColor
    )};
  border-left: 2px solid
    ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
  padding: 10px;
  margin: 10px 0;
  overflow: hidden;
  border-radius: ${(props) => props.theme.cardRadius}px;

  &.sub-lesson {
    padding-inline: 5px;
    margin-block: 0;
    border-left: 2px solid transparent;
    border-bottom: 2px solid
      ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          chroma(theme.white).alpha(0.2).hex(),
          theme.white
        )};
  }

  .duration {
    margin: 1px 0;
  }

  & > header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    align-content: flex-start;

    button {
      margin-left: auto;
      margin-top: -2px;

      svg {
        transition: transform 0.2s ease-in;
        transform: rotate(180deg);
      }
    }

    & > .lesson__header {
      display: flex;
      align-items: center;
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
    }

    .lesson__title {
      font-size: 14px;
      color: ${(props) => props.theme.gray1};
      margin: 0;
      font-weight: bold;
      display: flex;
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
  }

  .lesson__topics {
    display: grid;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: all 0.5s;

    .lesson__overlay-text {
      margin: 0;
      text-align: center;
      line-height: 1.2em;

      &--emphasized,
      &--additional {
        display: block;
      }

      &--emphasized {
        font-style: italic;
        font-weight: 600;
      }
    }

    .lesson__overlay {
      grid-column: 1/2;
      width: 100%;
      height: 100%;
      position: absolute;
      display: grid;
      place-items: center;
      z-index: 1;
      backdrop-filter: blur(2px);
      background: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          "rgb(0 0 0 / 50%)",
          "rgb(255 255 255 / 50%)"
        )};
      place-content: center;
      gap: 4px;
      box-sizing: border-box;
      padding: 4px;

      &--row {
        grid-auto-flow: column;

        .lesson__overlay-text {
          margin: 0;
        }

        svg {
          width: 18px;
        }
      }

      svg {
        fill: ${({ theme }) =>
          getStylesBasedOnTheme(theme.mode, "#fff", "#000")};
      }
    }

    li:not(.lesson__overlay) {
      padding: 10px;
      background: transparent;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;

      &:first-child {
        margin-top: 10px;
      }

      &:last-child:not(.lesson__topic-current) {
        padding-bottom: 0;
        border-bottom: none;
      }

      &:not(.lesson__topic-current):not(:last-child) {
        border-bottom: 2px solid
          ${({ theme }) =>
            getStylesBasedOnTheme(
              theme.mode,
              chroma(theme.white).alpha(0.2).hex(),
              theme.white
            )};
      }

      &:hover p:last-child {
        text-decoration: underline;
      }

      &.lesson__topic-pending svg {
        margin-top: 4px;

        path {
          fill: ${({ theme }) =>
            getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
        }
      }

      &.lesson__topic-finished svg {
        margin-top: 7px;
      }

      .lesson__description {
        display: flex;

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

      &.lesson__topic-current {
        background: ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__inputBg,
            theme.inputBg,
            theme.gray1
          )};
        border-radius: ${(props) => props.theme.cardRadius}px;
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

        svg {
          margin-top: 2px;
        }
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
  }
`;
