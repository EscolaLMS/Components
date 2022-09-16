import { Button, IconTitle, ProgressRing, Text } from "../../..";
import * as React from "react";
import styled, { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import type { Lesson, Topic } from "@escolalms/sdk/lib/types/api";
import chroma from "chroma-js";

const ProgramIcon = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.33333 19.1668H14.6667C14.8877 19.1668 15.0996 19.079 15.2559 18.9228C15.4122 18.7665 15.5 18.5545 15.5 18.3335V8.3335C15.5 8.11248 15.4122 7.90052 15.2559 7.74424C15.0996 7.58796 14.8877 7.50016 14.6667 7.50016H1.33333C1.11232 7.50016 0.900358 7.58796 0.744078 7.74424C0.587797 7.90052 0.5 8.11248 0.5 8.3335V18.3335C0.5 18.5545 0.587797 18.7665 0.744078 18.9228C0.900358 19.079 1.11232 19.1668 1.33333 19.1668ZM2.16667 9.16683H13.8333V17.5002H2.16667V9.16683ZM11.3333 12.5002V14.1668C11.3333 14.3878 11.2455 14.5998 11.0893 14.7561C10.933 14.9124 10.721 15.0002 10.5 15.0002H5.5C5.27899 15.0002 5.06702 14.9124 4.91074 14.7561C4.75446 14.5998 4.66667 14.3878 4.66667 14.1668V12.5002C4.66667 12.2791 4.75446 12.0672 4.91074 11.9109C5.06702 11.7546 5.27899 11.6668 5.5 11.6668C5.72101 11.6668 5.93297 11.7546 6.08926 11.9109C6.24554 12.0672 6.33333 12.2791 6.33333 12.5002V13.3335H9.66667V12.5002C9.66667 12.2791 9.75446 12.0672 9.91074 11.9109C10.067 11.7546 10.279 11.6668 10.5 11.6668C10.721 11.6668 10.933 11.7546 11.0893 11.9109C11.2455 12.0672 11.3333 12.2791 11.3333 12.5002ZM3 4.16683H13C13.221 4.16683 13.433 4.25463 13.5893 4.41091C13.7455 4.56719 13.8333 4.77915 13.8333 5.00016C13.8333 5.22118 13.7455 5.43314 13.5893 5.58942C13.433 5.7457 13.221 5.8335 13 5.8335H3C2.77899 5.8335 2.56702 5.7457 2.41074 5.58942C2.25446 5.43314 2.16667 5.22118 2.16667 5.00016C2.16667 4.77915 2.25446 4.56719 2.41074 4.41091C2.56702 4.25463 2.77899 4.16683 3 4.16683ZM4.66667 2.50016C4.44565 2.50016 4.23369 2.41237 4.07741 2.25609C3.92113 2.0998 3.83333 1.88784 3.83333 1.66683C3.83333 1.44582 3.92113 1.23385 4.07741 1.07757C4.23369 0.921293 4.44565 0.833496 4.66667 0.833496H11.3333C11.5543 0.833496 11.7663 0.921293 11.9226 1.07757C12.0789 1.23385 12.1667 1.44582 12.1667 1.66683C12.1667 1.88784 12.0789 2.0998 11.9226 2.25609C11.7663 2.41237 11.5543 2.50016 11.3333 2.50016H4.66667Z" />
  </svg>
);

const FinishedIcon = () => (
  <svg
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.634003 3.95823C0.769077 3.82767 0.950483 3.75611 1.13832 3.7593C1.32615 3.76249 1.50502 3.84016 1.63559 3.97523L3.9065 6.32619L9.13046 1.16315C9.26663 1.04596 9.44225 0.984889 9.62175 0.992303C9.80125 0.999718 9.97123 1.07506 10.0973 1.20309C10.2233 1.33111 10.296 1.50224 10.3006 1.68184C10.3052 1.86143 10.2414 2.03607 10.1221 2.1704L4.391 7.83707C4.25895 7.96767 4.08089 8.04118 3.89517 8.04177H3.88879C3.79532 8.0412 3.70288 8.02213 3.6168 7.98565C3.53073 7.94918 3.45273 7.89604 3.38729 7.82928L0.617003 4.95982C0.486441 4.82474 0.414883 4.64334 0.418071 4.4555C0.421259 4.26767 0.498932 4.0888 0.634003 3.95823ZM13.3805 1.16315L8.15863 6.32619L7.97234 6.13282C7.90778 6.06553 7.83058 6.01166 7.74516 5.97428C7.65974 5.9369 7.56778 5.91675 7.47455 5.91499C7.38132 5.91324 7.28867 5.9299 7.2019 5.96404C7.11513 5.99817 7.03595 6.0491 6.96891 6.11391C6.90187 6.17871 6.84828 6.25611 6.81122 6.34168C6.77416 6.42724 6.75436 6.51927 6.75295 6.61251C6.75154 6.70574 6.76856 6.79833 6.80301 6.88497C6.83747 6.97161 6.8887 7.0506 6.95375 7.1174L7.638 7.82573C7.70344 7.89249 7.78144 7.94564 7.86751 7.98211C7.95358 8.01858 8.04602 8.03766 8.1395 8.03823H8.14729C8.33302 8.03764 8.51108 7.96413 8.64313 7.83352L14.3743 2.16686C14.491 2.03193 14.5525 1.85792 14.5465 1.6796C14.5406 1.50128 14.4675 1.33178 14.342 1.20499C14.2164 1.0782 14.0477 1.00346 13.8694 0.995704C13.6912 0.987946 13.5165 1.04775 13.3805 1.16315Z"
      fill="#6FCF97"
    />
  </svg>
);

const CurrentIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={"current-icon"}
  >
    <path
      d="M8.4987 0.708496C6.95766 0.708496 5.45122 1.16547 4.16988 2.02163C2.88855 2.87779 1.88987 4.09468 1.30014 5.51842C0.710407 6.94216 0.556106 8.50881 0.856749 10.0202C1.15739 11.5317 1.89948 12.92 2.98916 14.0097C4.07885 15.0994 5.46719 15.8415 6.97862 16.1421C8.49006 16.4428 10.0567 16.2885 11.4804 15.6987C12.9042 15.109 14.1211 14.1103 14.9772 12.829C15.8334 11.5476 16.2904 10.0412 16.2904 8.50016C16.2879 6.43443 15.4662 4.45401 14.0056 2.99331C12.5449 1.53262 10.5644 0.710933 8.4987 0.708496ZM8.4987 14.8752C7.23785 14.8752 6.0053 14.5013 4.95694 13.8008C3.90858 13.1003 3.09148 12.1046 2.60897 10.9398C2.12646 9.77489 2.00021 8.49309 2.2462 7.25646C2.49218 6.01983 3.09934 4.88392 3.9909 3.99236C4.88246 3.1008 6.01837 2.49364 7.255 2.24766C8.49163 2.00168 9.77343 2.12792 10.9383 2.61043C12.1032 3.09294 13.0988 3.91004 13.7993 4.9584C14.4998 6.00677 14.8737 7.23931 14.8737 8.50016C14.8716 10.1903 14.1993 11.8106 13.0042 13.0057C11.8091 14.2008 10.1888 14.8731 8.4987 14.8752ZM7.08204 5.66683L11.332 8.50016L7.08204 11.3335V5.66683Z"
      fill="#F47820"
    />
  </svg>
);

const PendingIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={"pending-icon"}
  >
    <path
      d="M1.54036 12.1668H11.457C11.6449 12.1668 11.8251 12.0922 11.9579 11.9594C12.0907 11.8265 12.1654 11.6464 12.1654 11.4585V1.54183C12.1654 1.35397 12.0907 1.1738 11.9579 1.04096C11.8251 0.908124 11.6449 0.833496 11.457 0.833496H1.54036C1.3525 0.833496 1.17234 0.908124 1.0395 1.04096C0.906659 1.1738 0.832031 1.35397 0.832031 1.54183V11.4585C0.832031 11.6464 0.906659 11.8265 1.0395 11.9594C1.17234 12.0922 1.3525 12.1668 1.54036 12.1668ZM2.2487 2.25016H10.7487V10.7502H2.2487V2.25016Z"
      fill="#6D6D6D"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="13"
    height="8"
    viewBox="0 0 13 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.88128 0.381282C6.22299 0.0395728 6.77701 0.0395728 7.11872 0.381282L12.3687 5.63128C12.7104 5.97299 12.7104 6.52701 12.3687 6.86872C12.027 7.21043 11.473 7.21043 11.1313 6.86872L6.5 2.23744L1.86872 6.86872C1.52701 7.21043 0.97299 7.21043 0.631282 6.86872C0.289573 6.52701 0.289573 5.97299 0.631282 5.63128L5.88128 0.381282Z"
      fill="currentColor"
    />
  </svg>
);

interface SharedComponentProps {
  mobile?: boolean;
  onMarkFinished: (topic: Topic) => void;
  onTopicClick: (topic: Topic) => void;
  finishedTopicIds: number[];
}

interface CourseAgendaProps extends SharedComponentProps {
  lessons: Lesson[];
  currentTopicId: number;
}

interface CourseAgendaLessonProps extends SharedComponentProps {
  lesson: Lesson;
  index: number;
  currentTopicId: number;
  defaultOpen?: boolean;
}

interface CourseAgendaTopicProps extends SharedComponentProps {
  index: number;
  topic: Topic;
  mode: "pending" | "current" | "finished";
}

const StyledSection = styled("section")`
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
      theme.mode === "light"
        ? theme.cardBackgroundColorDark
        : theme.cardBackgroundColorLight};
    border-left: 2px solid ${(props) => props.theme.primaryColor};
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
            theme.mode === "dark" && theme.primaryColorDark
              ? theme.primaryColorDark
              : theme.primaryColor};
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
            color: ${(props) => props.theme.primaryColor};
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
      list-style: none;
      margin: 0;
      padding: 0;
      transition: all 0.5s;
      li {
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
              theme.mode === "light"
                ? theme.white
                : chroma(theme.white).alpha(0.2).hex()};
        }

        &:hover p:last-child {
          text-decoration: underline;
        }

        &.lesson__topic-pending svg {
          margin-top: 4px;

          path {
            fill: ${({ theme }) =>
              theme.mode === "light" ? theme.gray1 : theme.white};
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
              fill: ${({ theme }) => theme.primaryColor};
            }
          }

          .lesson__index {
            opacity: 0.5;
            margin-right: 4px;
          }
        }

        &.lesson__topic-current {
          background: ${({ theme }) =>
            theme.mode === "light"
              ? theme.white
              : chroma(theme.cardBackgroundColorLight).brighten(0.4).hex()};
          border-radius: ${(props) => props.theme.cardRadius}px;
          cursor: default;
          button {
            margin-top: 10px;
            border-width: 1px;
            font-weight: normal;
          }
          &:hover,
          .lesson__description p:last-child {
            text-decoration: none;
          }

          svg {
            margin-top: 2px;
          }
        }
      }
    }
  }

  .lesson__item.open .lesson__topics {
    transition: all 0.35s ease-in;
  }

  .lesson__item.closed .lesson__topics {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s ease-out;
  }
`;

const TopicIcon: React.FC<{ mode: CourseAgendaTopicProps["mode"] }> = ({
  mode,
}) => {
  switch (mode) {
    case "current":
      return <CurrentIcon />;
    case "finished":
      return <FinishedIcon />;
    case "pending":
      return <PendingIcon />;
  }
};

const CourseAgendaTopic: React.FC<CourseAgendaTopicProps> = ({
  index,
  topic,
  mode,
  finishedTopicIds,
  onMarkFinished,
  onTopicClick,
}) => {
  const { t } = useTranslation();
  const onClick = React.useCallback(() => {
    if (mode !== "current") {
      onTopicClick && onTopicClick(topic);
    }
  }, [mode]);

  return (
    <li className={`lesson__topic lesson__topic-${mode}`}>
      <div
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        role="button"
      >
        <div className={"lesson__description"}>
          <TopicIcon mode={mode} />
          <Text
            className={"lesson__index"}
            size={"14"}
            noMargin
            bold={mode === "current"}
          >
            {index}.{" "}
          </Text>
          <Text size={"14"} noMargin bold={mode === "current"}>
            {topic.title}
          </Text>
        </div>

        {mode === "current" && !finishedTopicIds.includes(topic.id) && (
          <Button
            block
            mode="outline"
            onClick={() => onMarkFinished && onMarkFinished(topic)}
          >
            {t<string>("Course.markAsFinished")}
          </Button>
        )}
      </div>
    </li>
  );
};

const CourseAgendaLesson: React.FC<CourseAgendaLessonProps> = (props) => {
  const {
    mobile = false,
    lesson,
    index,
    finishedTopicIds,
    currentTopicId,
    defaultOpen = false,
    onMarkFinished,
    onTopicClick,
  } = props;
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(defaultOpen);
  const onClick = React.useCallback(() => {
    setOpen(true);
  }, []);
  React.useEffect(() => {
    if (defaultOpen && !open) {
      setOpen(true);
    }
  }, [defaultOpen, open]);
  return (
    <div
      className={`lesson__item ${open ? "open" : "closed"}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
    >
      {!mobile && (
        <header>
          <div className={"lesson__details"}>
            <Text noMargin size={"12"}>
              {t<string>("Course.Lesson")} {index + 1}
            </Text>
            <Text noMargin size={"12"}>
              {lesson.duration && lesson.duration}
            </Text>
          </div>
          <div>
            <Text size={"14"} bold noMargin>
              {lesson.title}
            </Text>
          </div>
          <Button
            onClick={(e: {
              stopPropagation: () => void;
              preventDefault: () => void;
            }) => {
              e.stopPropagation();
              e.preventDefault();
              setOpen(!open);
            }}
            mode={"icon"}
          >
            <ChevronIcon />
          </Button>
        </header>
      )}
      <ul className="lesson__topics">
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
              key={topicIndex}
              topic={topic}
              index={topicIndex + 1}
              mode={mode}
              onMarkFinished={onMarkFinished}
              onTopicClick={onTopicClick}
              finishedTopicIds={finishedTopicIds}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const CourseAgenda: React.FC<CourseAgendaProps> = (props) => {
  const {
    mobile = false,
    lessons,
    finishedTopicIds,
    currentTopicId,
    onMarkFinished,
    onTopicClick,
  } = props;
  const { t } = useTranslation();

  const flatTopics: Topic[] = React.useMemo(
    () =>
      lessons.reduce(
        (acc, curr) =>
          Array.isArray(curr.topics) ? [...acc, ...curr.topics] : acc,
        [] as Topic[]
      ),
    [lessons]
  );

  const percentage = React.useMemo(() => {
    return Math.round((finishedTopicIds.length / flatTopics.length) * 100);
  }, [flatTopics, finishedTopicIds]);

  return (
    <StyledSection className="wellms-component">
      {!mobile && (
        <header>
          <IconTitle
            level={5}
            icon={<ProgramIcon />}
            title={t<string>("Course.Agenda")}
          />
          <div>
            <Text mode="secondary" size={"14"} noMargin>
              {t<string>("Course.Finished")} {percentage}%
            </Text>
            <ProgressRing percentage={percentage} />
          </div>
        </header>
      )}
      <article>
        {lessons.map((lesson, index) => (
          <CourseAgendaLesson
            defaultOpen={lesson.topics?.some(
              (topic) => topic.id === currentTopicId
            )}
            key={lesson.id}
            index={index}
            {...{
              lesson,
              finishedTopicIds,
              currentTopicId,
              onMarkFinished,
              onTopicClick,
            }}
          />
        ))}
      </article>
    </StyledSection>
  );
};

const NewComponent = styled(CourseAgenda)<CourseAgendaProps>``;

export default withTheme(NewComponent);
