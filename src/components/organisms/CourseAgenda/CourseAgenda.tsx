import { FC, useMemo, useContext, createContext } from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";
import type { Lesson, Topic } from "@escolalms/sdk/lib/types/api";

import { IconTitle, ProgressRing, Text } from "../../..";
import { ExtendableStyledComponent } from "types/component";
import CourseAgendaLesson from "./_components/CourseAgendaLesson";
import { ProgramIcon } from "./_components/Icons";

interface TopicContext extends SharedComponentPropsHandlers {
  lessons: Lesson[];
  firstUnskippableTopic?: Topic;
  positionInLessonOfFirstUnskippableTopic: number | undefined;
  lockedLessonsIds: number[];
  lockedTopicsIds: number[];
}

const TopicsContext = createContext<TopicContext>({
  lessons: [],
  lockedLessonsIds: [],
  lockedTopicsIds: [],
  positionInLessonOfFirstUnskippableTopic: undefined,
  onMarkFinished: console.log,
  onTopicClick: console.log,
  onNextTopicClick: console.log,
});

export const useTopicsContext = () => {
  const topicsContext = useContext(TopicsContext);
  return topicsContext;
};

export interface SharedComponentPropsHandlers {
  onMarkFinished: (topic: Topic) => void;
  onTopicClick: (topic: Topic) => void;
  onNextTopicClick: () => void;
}

export interface SharedComponentProps extends SharedComponentPropsHandlers {
  mobile?: boolean;
  finishedTopicIds: number[];
}

interface CourseAgendaProps
  extends SharedComponentProps,
    ExtendableStyledComponent {
  lessons: Lesson[];
  currentTopicId: number;
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
`;

export const CourseAgenda: FC<CourseAgendaProps> = (props) => {
  const {
    mobile = false,
    lessons,
    onMarkFinished,
    onTopicClick,
    onNextTopicClick,
    className = "",
    finishedTopicIds,
    currentTopicId,
  } = props;
  const { t } = useTranslation();

  const allTopics = useMemo(
    () => lessons.flatMap((lesson) => lesson.topics),
    [lessons]
  );

  const firstBlockingTopic = useMemo(
    () =>
      allTopics
        .filter((topic): topic is Topic => typeof topic !== "undefined")
        .filter((topic) => !finishedTopicIds.includes(topic.id))
        .find((topic) => !topic.can_skip),
    [finishedTopicIds, currentTopicId]
  );

  const indexOfFirstLessonWithBlockingTopic = useMemo(
    () =>
      firstBlockingTopic &&
      lessons.findIndex((lesson) => lesson.id === firstBlockingTopic.lesson_id),
    [firstBlockingTopic]
  );

  const indexOfFirstBlockingTopic = allTopics.indexOf(firstBlockingTopic);

  const positionInLessonOfFirstUnskippableTopic = useMemo(
    () =>
      indexOfFirstLessonWithBlockingTopic &&
      firstBlockingTopic &&
      lessons[indexOfFirstLessonWithBlockingTopic].topics?.indexOf(
        firstBlockingTopic
      ),
    [indexOfFirstLessonWithBlockingTopic, firstBlockingTopic]
  );

  const lockedTopicsIds = useMemo(
    () =>
      indexOfFirstBlockingTopic !== -1
        ? allTopics
            .filter((_, index) => index > indexOfFirstBlockingTopic)
            .map((topic) => (topic?.id ? topic?.id : null))
            .filter((topicId): topicId is number => !!topicId)
        : [],
    [indexOfFirstBlockingTopic]
  );

  const lockedLessonsIds = useMemo(
    () =>
      indexOfFirstLessonWithBlockingTopic !== undefined
        ? lessons
            .filter((_, index) => index > indexOfFirstLessonWithBlockingTopic)
            .map((lesson) => lesson.id)
        : [],
    [indexOfFirstLessonWithBlockingTopic]
  );

  // if prop 'currentTopicId' refers to locked topic, then current topic is firstBlockingTopic
  const currentNotLockedTopicId = useMemo(
    () =>
      lockedTopicsIds && lockedTopicsIds.includes(currentTopicId)
        ? firstBlockingTopic?.id
        : currentTopicId,
    [lockedTopicsIds, firstBlockingTopic, currentTopicId]
  );

  const percentage = useMemo(() => {
    return Math.round((finishedTopicIds.length / allTopics.length) * 100);
  }, [allTopics, finishedTopicIds]);

  return (
    <StyledSection className={`wellms-component ${className}`}>
      <TopicsContext.Provider
        value={{
          lessons: lessons,
          firstUnskippableTopic: firstBlockingTopic,
          positionInLessonOfFirstUnskippableTopic,
          lockedLessonsIds,
          lockedTopicsIds,
          onMarkFinished,
          onTopicClick,
          onNextTopicClick,
        }}
      >
        {!mobile && (
          <header>
            <IconTitle
              level={5}
              as="h1"
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
                (topic) => topic.id === currentNotLockedTopicId
              )}
              key={lesson.id}
              index={index}
              {...{
                lesson,
                finishedTopicIds,
                currentTopicId: currentNotLockedTopicId,
              }}
            />
          ))}
        </article>
      </TopicsContext.Provider>
    </StyledSection>
  );
};

const NewComponent = styled(CourseAgenda)<CourseAgendaProps>``;

export default withTheme(NewComponent);
