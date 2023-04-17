import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import chroma from "chroma-js";
import { Lesson } from "@escolalms/sdk/lib/types/api";

import Button from "../../../atoms/Button/Button";
import Text from "../../../atoms/Typography/Text";
import { SharedComponentProps, useTopicsContext } from "../CourseAgenda";
import CourseAgendaTopic, { CourseAgendaTopicProps } from "./CourseAgendaTopic";
import { getStylesBasedOnTheme } from "../../../../utils/utils";
import { ChevronIcon, LockIcon } from "./Icons";

interface CourseAgendaLessonProps
  extends Omit<
    SharedComponentProps,
    "onMarkFinished" | "onTopicClick" | "onNextTopicClick"
  > {
  lesson: Lesson;
  index: number;
  currentTopicId?: number;
  defaultOpen?: boolean;
  onCourseFinished: () => void;
}

const StyledLessonItem = styled.div`
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
        transition: transform 0.2s ease-in;
        transform: rotate(180deg);
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

  &.closed {
    cursor: pointer;
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

  &.open .lesson__topics {
    transition: all 0.35s ease-in;

    &--locked {
      min-height: 64px;
    }
  }

  &.closed .lesson__topics {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s ease-out;
  }

  .lesson__header {
    flex-grow: 1;
    display: flex;
  }
`;

/* 
1. CSS grid starts with 1 as closest to the edge value
2. JS Arrays are counting from 0 - first shift by 1
3. First topic with can_skip=false should be actualy visible - second shift by 1
*/
const GRID_PURPOSES_NUMBER = 2;

const CourseAgendaLesson: React.FC<CourseAgendaLessonProps> = (props) => {
  const {
    mobile = false,
    lesson,
    index,
    finishedTopicIds,
    currentTopicId,
    defaultOpen = false,
    onCourseFinished,
  } = props;
  const { t } = useTranslation();
  const {
    firstUnskippableTopic,
    lockedLessonsIds,
    lockedTopicsIds,
    positionInLessonOfFirstUnskippableTopic,
  } = useTopicsContext();

  const [open, setOpen] = useState(defaultOpen);

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (defaultOpen && !open) {
      setOpen(true);
    }
  }, [defaultOpen]);

  const indexOfFirstLockedTopic = useMemo(
    () =>
      (firstUnskippableTopic &&
        lesson.topics?.findIndex(
          (topic) => topic.id === firstUnskippableTopic?.id
        )) ??
      -1,
    [firstUnskippableTopic]
  );

  const lessonHasLockedTopic =
    lesson?.topics?.some((lesson) => lockedTopicsIds.includes(lesson.id)) ??
    false;
  const gridStartingPosition = indexOfFirstLockedTopic + GRID_PURPOSES_NUMBER;
  const totalHeightOfOverlay =
    typeof lesson.topics !== "undefined"
      ? lesson.topics?.length - indexOfFirstLockedTopic - 1
      : 0;

  const isLessonLocked = lockedLessonsIds.includes(lesson.id);

  const overlayTextWhenLessonIsLocked =
    totalHeightOfOverlay > 2
      ? t("CourseAgenda.FinishRequiredTopicsBefore")
      : t("CourseAgenda.FirstFinishRequiredTopics");

  const overlayTextWhenTopicIsLocked =
    totalHeightOfOverlay > 1
      ? t("CourseAgenda.YouHaveToCompleteTopic")
      : t("CourseAgenda.TopicIsLocked");

  return (
    <StyledLessonItem
      className={`lesson__item ${open ? "open" : "closed"}`}
      aria-label={`${t<string>("Course.Lesson")} ${index + 1}`}
    >
      {!mobile && (
        <header>
          <div
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
            role="button"
            tabIndex={0}
            className="lesson__header"
          >
            <div className={"lesson__details"}>
              <Text noMargin size={"12"}>
                {t<string>("Course.Lesson")} {index + 1}
              </Text>
              <Text noMargin size={"12"}>
                {lesson.duration && lesson.duration}
              </Text>
            </div>
            <div>
              <Text size={"13"} bold noMargin>
                {lesson.title}
              </Text>
            </div>
          </div>
          <Button
            onClick={(e: {
              stopPropagation: () => void;
              preventDefault: () => void;
            }) => {
              e.stopPropagation();
              e.preventDefault();
              setOpen((prev) => !prev);
            }}
            mode={"icon"}
            aria-label={t<string>(open ? "Actions.Hide" : "Action.Show")}
          >
            <ChevronIcon />
          </Button>
        </header>
      )}
      <ul
        className={`lesson__topics ${
          lessonHasLockedTopic || isLessonLocked ? "lesson__topics--locked" : ""
        }`}
      >
        {(lessonHasLockedTopic || isLessonLocked) && (
          <li
            className={`lesson__overlay ${
              totalHeightOfOverlay === 1 && "lesson__overlay--row"
            }`}
            style={{
              gridRowStart: isLessonLocked ? 1 : gridStartingPosition,
            }}
          >
            <LockIcon />
            {isLessonLocked ? (
              <>
                <Text size={"13"} noMargin className="lesson__overlay-text">
                  {overlayTextWhenLessonIsLocked}
                </Text>
                {totalHeightOfOverlay > 2 && (
                  <Text size={"12"} noMargin className="lesson__overlay-text">
                    {t("CourseAgenda.TopicToComplete")}:{" "}
                    <span className="lesson__overlay-text lesson__overlay-text--emphasized">
                      {firstUnskippableTopic?.title}
                    </span>
                  </Text>
                )}
              </>
            ) : (
              <Text size={"13"} noMargin className="lesson__overlay-text">
                {overlayTextWhenTopicIsLocked}
                <span className="lesson__overlay-text lesson__overlay-text--emphasized">
                  {totalHeightOfOverlay < 3 &&
                    totalHeightOfOverlay > 1 &&
                    positionInLessonOfFirstUnskippableTopic !== undefined &&
                    ` nr. ${positionInLessonOfFirstUnskippableTopic + 1} `}
                  {totalHeightOfOverlay >= 3 &&
                    ` ${firstUnskippableTopic?.title} `}
                </span>
                <span className="lesson__overlay-text lesson__overlay-text--additional">
                  {totalHeightOfOverlay > 2 &&
                    t("CourseAgenda.ToAccessTheFollowing")}
                </span>
              </Text>
            )}
          </li>
        )}
        {lesson.topics?.map((topic, topicIndex) => {
          let mode: CourseAgendaTopicProps["mode"] = "pending";

          if (finishedTopicIds.includes(topic.id)) {
            mode = "finished";
          }

          if (currentTopicId === topic.id) {
            mode = "current";
          }

          return (
            <CourseAgendaTopic
              clickable={open && !lockedTopicsIds.includes(topic.id)}
              key={topicIndex}
              topic={topic}
              index={topicIndex + 1}
              mode={mode}
              finishedTopicIds={finishedTopicIds}
              onCourseFinished={onCourseFinished}
            />
          );
        })}
      </ul>
    </StyledLessonItem>
  );
};

export default CourseAgendaLesson;
