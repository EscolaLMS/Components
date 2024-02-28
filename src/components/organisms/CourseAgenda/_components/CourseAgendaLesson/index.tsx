import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Lesson } from "@escolalms/sdk/lib/types/api";

import { useCourseAgendaContext } from "../context";
import CourseAgendaTopic from "../CourseAgendaTopic";
import { Header } from "./Header";
import { StyledLessonItem } from "./styles";
import { getFlatTopics } from "utils/course";
import { isAfter } from "date-fns";

interface CourseAgendaLessonProps {
  children: React.ReactNode;
  lesson: Lesson;
  index: number;
  isSubLesson: boolean;
  defaultOpen?: boolean;
}

export const CourseAgendaLesson: React.FC<CourseAgendaLessonProps> = ({
  children,
  defaultOpen = false,
  index,
  lesson,
  isSubLesson,
}) => {
  const { t } = useTranslation();
  const {
    areAllTopicsUnlocked,
    lockedTopicsIds,
    finishedTopicIds,
    currentLesson,
    currentLessonParentLessonsIds,
  } = useCourseAgendaContext();

  const [open, setOpen] = useState(defaultOpen);
  const openMenu = useCallback(() => setOpen(true), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (defaultOpen && !open) {
      setOpen(true);
    }
  }, [defaultOpen]);

  const isLessonActive = useMemo(
    () =>
      lesson.active_from === null ||
      isAfter(new Date(), new Date(lesson.active_from)),
    [lesson.id]
  );

  const isModuleFinished = useMemo(() => {
    const lessonFlatTopics = getFlatTopics([lesson]);

    return (
      lessonFlatTopics.length > 0 &&
      lessonFlatTopics.every((t) => finishedTopicIds?.includes(t.id)) &&
      !isSubLesson
    );
  }, [finishedTopicIds, lesson, isSubLesson]);

  const isRootAncestor = useMemo(() => {
    if (currentLessonParentLessonsIds?.[0] === undefined)
      return currentLesson?.id === lesson.id;

    return currentLessonParentLessonsIds[0] === lesson.id;
  }, [currentLesson?.id, currentLessonParentLessonsIds, lesson.id]);

  const isAncestor = useMemo(
    () =>
      currentLessonParentLessonsIds?.includes(lesson.id) ||
      currentLesson?.id === lesson.id,
    [currentLesson?.id, currentLessonParentLessonsIds, lesson.id]
  );

  return (
    <StyledLessonItem
      className={`lesson__item ${open ? "open" : "closed"} ${
        isAncestor && !isRootAncestor && open ? "full-border" : ""
      } ${!isSubLesson ? 'bottom-border' : ''}`}
      aria-label={`${t<string>("Course.Lesson")} ${index + 1}`}
    >
      <Header
        lesson={lesson}
        index={index}
        open={open}
        onClick={openMenu}
        onToggleClick={toggleMenu}
        isSubLesson={isSubLesson}
        isModuleFinished={isModuleFinished}
        isLessonActive={isLessonActive}
      />
      <ul className="lesson__topics">
        {(lesson?.topics ?? []).map((topic, topicIndex) => (
          <CourseAgendaTopic
            key={topicIndex}
            clickable={
              areAllTopicsUnlocked ||
              (!areAllTopicsUnlocked &&
                open &&
                !lockedTopicsIds.includes(topic.id))
            }
            topic={topic}
            index={topicIndex + 1}
          />
        ))}
      </ul>
      {!!lesson.lessons?.length && (
        <ul className="lesson__lessons">{children}</ul>
      )}
    </StyledLessonItem>
  );
};

export default CourseAgendaLesson;
