import React, { useContext, useMemo } from "react";
import { API } from "@escolalms/sdk/lib";

import {
  getFlatLessons,
  getFlatTopics,
  getLessonParentsIds,
} from "../../../../utils/course";

interface SharedContextData {
  lessons: API.Lesson[];
  finishedTopicIds: number[];
  areAllTopicsUnlocked?: boolean;
  availableTopicsIds: number[];

  onMarkFinished: (topic: API.Topic) => void;
  onTopicClick: (topic: API.Topic) => void;
  onNextTopicClick: () => void;
  onCourseFinished: () => void;
}

interface CourseAgendaContextData extends SharedContextData {
  firstBlockingTopic?: API.Topic;
  positionInLessonOfFirstBlockingTopic: number;
  lockedLessonsIds: number[];
  lockedTopicsIds: number[];
  flatTopics: API.Topic[];
  currentNotLockedTopicId: number | undefined;
  percentage: number;
  notFinishedTopics: API.Topic[];
  currentLesson: API.Lesson | undefined;
  currentLessonParentLessonsIds: number[];
}

const CourseAgendaContext = React.createContext<CourseAgendaContextData>({
  notFinishedTopics: [],
  finishedTopicIds: [],
  lessons: [],
  lockedLessonsIds: [],
  lockedTopicsIds: [],
  flatTopics: [],
  currentLesson: undefined,
  currentLessonParentLessonsIds: [],
  positionInLessonOfFirstBlockingTopic: -1,
  percentage: 0,
  currentNotLockedTopicId: undefined,
  areAllTopicsUnlocked: false,
  availableTopicsIds: [],

  onMarkFinished: () => console.warn("INITIAL STATE!"),
  onTopicClick: () => console.warn("INITIAL STATE!"),
  onNextTopicClick: () => console.warn("INITIAL STATE!"),
  onCourseFinished: () => console.warn("INITIAL STATE!"),
});

export const useCourseAgendaContext = () => useContext(CourseAgendaContext);

export interface CourseAgendaContextProviderProps extends SharedContextData {
  children: React.ReactNode;

  currentTopicId: number;
}

export const CourseAgendaContextProvider: React.FC<
  CourseAgendaContextProviderProps
> = ({
  children,
  currentTopicId,
  lessons,
  finishedTopicIds,
  areAllTopicsUnlocked,
  availableTopicsIds,
  onTopicClick,
  onNextTopicClick,
  onMarkFinished,
  onCourseFinished,
}) => {
  const flatTopics = useMemo(() => getFlatTopics(lessons), [lessons]);

  const flatLessons = useMemo(() => getFlatLessons(lessons ?? []), [lessons]);

  const firstBlockingTopic = useMemo(
    () =>
      flatTopics.find((t) => !finishedTopicIds.includes(t.id) && !t.can_skip),
    [finishedTopicIds, currentTopicId]
  );

  const indexOfFirstLessonWithBlockingTopic = useMemo(
    () => flatLessons.findIndex((l) => l.id === firstBlockingTopic?.lesson_id),
    [flatLessons, firstBlockingTopic]
  );

  const indexOfFirstBlockingTopic = useMemo(
    () => flatTopics.findIndex((t) => t.id === firstBlockingTopic?.id),
    [flatTopics, firstBlockingTopic?.id]
  );

  const positionInLessonOfFirstBlockingTopic = useMemo(
    () =>
      flatLessons?.[indexOfFirstLessonWithBlockingTopic]?.topics?.findIndex(
        (t) => t.id === firstBlockingTopic?.id
      ) ?? -1,
    [indexOfFirstLessonWithBlockingTopic, firstBlockingTopic?.id, flatLessons]
  );

  const lockedTopicsIds = useMemo(
    () =>
      indexOfFirstBlockingTopic !== -1
        ? flatTopics.reduce<number[]>((acc, t, i) => {
            if (i <= indexOfFirstBlockingTopic) return acc;
            if (t.id === undefined) return acc;

            return [...acc, t.id];
          }, [])
        : [],
    [indexOfFirstBlockingTopic]
  );

  const lockedLessonsIds = useMemo(
    () =>
      indexOfFirstLessonWithBlockingTopic !== -1
        ? flatLessons.reduce<number[]>((acc, l, i) => {
            if (i <= indexOfFirstLessonWithBlockingTopic) return acc;

            return [...acc, l.id];
          }, [])
        : [],
    [indexOfFirstLessonWithBlockingTopic, flatLessons]
  );

  // if prop 'currentTopicId' refers to locked topic, then current topic is firstBlockingTopic
  const currentNotLockedTopicId = useMemo(
    () =>
      lockedTopicsIds.includes(currentTopicId)
        ? firstBlockingTopic?.id
        : currentTopicId,
    [lockedTopicsIds, firstBlockingTopic, currentTopicId]
  );

  const currentLesson = useMemo(
    () =>
      flatLessons.find((l) =>
        (l?.topics ?? []).find((t) => t.id === currentNotLockedTopicId)
      ),
    [flatLessons, currentNotLockedTopicId]
  );

  const percentage = useMemo(() => {
    return Math.round((finishedTopicIds.length / flatTopics.length) * 100);
  }, [flatTopics, finishedTopicIds]);

  const notFinishedTopics = useMemo(
    () => flatTopics.filter((t) => !finishedTopicIds.includes(t.id)),
    [flatLessons.length, finishedTopicIds.length]
  );

  const currentLessonParentLessonsIds = useMemo(
    () =>
      currentLesson ? getLessonParentsIds(flatLessons, currentLesson) : [],
    [flatLessons, currentLesson]
  );

  return (
    <CourseAgendaContext.Provider
      value={{
        finishedTopicIds,
        lessons,
        firstBlockingTopic,
        positionInLessonOfFirstBlockingTopic,
        flatTopics,
        lockedLessonsIds,
        lockedTopicsIds,
        currentNotLockedTopicId,
        percentage,
        notFinishedTopics,
        currentLesson,
        currentLessonParentLessonsIds,
        areAllTopicsUnlocked,
        availableTopicsIds,
        onMarkFinished,
        onTopicClick,
        onNextTopicClick,
        onCourseFinished,
      }}
    >
      {children}
    </CourseAgendaContext.Provider>
  );
};
