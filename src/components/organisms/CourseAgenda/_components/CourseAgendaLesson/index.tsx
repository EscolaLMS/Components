import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Lesson } from "@escolalms/sdk/lib/types/api";

import { useCourseAgendaContext } from "../context";
import CourseAgendaTopic from "../CourseAgendaTopic";
import { Header } from "./Header";
import { LockedOverlay } from "./LockedOverlay";
import { StyledLessonItem } from "./styles";

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
  const { areAllTopicsUnlocked, lockedLessonsIds, lockedTopicsIds } =
    useCourseAgendaContext();

  const [open, setOpen] = useState(defaultOpen);
  const openMenu = useCallback(() => setOpen(true), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (defaultOpen && !open) {
      setOpen(true);
    }
  }, [defaultOpen]);

  const isLessonLocked = useMemo(
    () => lockedLessonsIds.includes(lesson.id),
    [lesson.id, lockedLessonsIds]
  );

  const lessonHasLockedTopic = useMemo(
    () => lesson?.topics?.some((l) => lockedTopicsIds.includes(l.id)) ?? false,
    [lesson?.topics, lockedTopicsIds]
  );

  return (
    <StyledLessonItem
      className={`lesson__item ${open ? "open" : "closed"} ${
        isSubLesson ? "sub-lesson" : ""
      }`}
      aria-label={`${t<string>("Course.Lesson")} ${index + 1}`}
    >
      <Header
        lesson={lesson}
        index={index}
        open={open}
        onClick={openMenu}
        onToggleClick={toggleMenu}
        isSubLesson={isSubLesson}
      />
      <ul
        className={`lesson__topics ${
          (lessonHasLockedTopic || isLessonLocked) && !areAllTopicsUnlocked
            ? "lesson__topics--locked"
            : ""
        }`}
      >
        {(lessonHasLockedTopic || isLessonLocked) && !areAllTopicsUnlocked && (
          <LockedOverlay lesson={lesson} isLessonLocked={isLessonLocked} />
        )}
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
