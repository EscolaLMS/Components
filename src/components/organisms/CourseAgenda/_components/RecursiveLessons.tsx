import React from "react";
import { API } from "@escolalms/sdk/lib";
import { useCourseAgendaContext } from "../context";
import { CourseAgendaLesson } from "./CourseAgendaLesson";

interface Props {
  lessons: API.Lesson[];
  depth?: number;
}

export const RecursiveLessons: React.FC<Props> = ({ lessons, depth = 0 }) => {
  const { currentLessonParentLessonsIds, currentLesson } =
    useCourseAgendaContext();

  return (
    <>
      {lessons.map((l, index) => (
        <CourseAgendaLesson
          key={l.id}
          defaultOpen={
            currentLessonParentLessonsIds.includes(l.id) ||
            currentLesson?.id === l.id
          }
          index={index}
          lesson={l}
          isSubLesson={depth > 0}
        >
          <RecursiveLessons lessons={l.lessons ?? []} depth={depth + 1} />
        </CourseAgendaLesson>
      ))}
    </>
  );
};
