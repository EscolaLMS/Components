import chroma from "chroma-js";
import styled from "styled-components";
import { getStylesBasedOnTheme } from "../../../../utils/utils";

// TODO: this should be divided into separate styled components
export const StyledSection = styled("section")<{ $mobile: boolean }>`
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & > header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    margin-bottom: 20px;

    .lms-icon-title {
      margin: 0;
      flex-wrap: nowrap;
    }
    & > div {
      display: inline-flex;
      align-items: center;

      p {
        margin-right: 6px;
      }
    }
  }
  .lesson__item {
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
          transform: rotate(180deg);
          transition: transform 0.2s ease-in;
        }
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

    .lesson__topics {
      list-style: none;
      margin: 0;
      padding: 0;
      transition: all 0.5s;

      li {
        padding: 10px;
        position: relative;
        display: flex;
        flex-direction: ${(props) => (props.$mobile ? "column" : "row")};

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

        button {
          margin-left: ${(props) => (props.$mobile ? "0" : "auto")};
          margin-top: ${(props) => (props.$mobile ? "6px" : "0")};
          font-size: 12px;
          padding: 3px 10px;
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
          align-items: center;

          svg {
            margin-right: 7px;
            width: 17px;
            flex-shrink: 0;

            path {
              fill: ${({ theme }) =>
                getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};
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
      }
    }
  }

  .lesson__item.open .lesson__topics {
    max-height: 100vh;
    transition: all 0.35s ease-in;
  }

  .lesson__item.closed .lesson__topics {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s ease-out;
  }
`;
