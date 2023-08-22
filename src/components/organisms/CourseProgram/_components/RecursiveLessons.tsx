import React from "react";
import { API } from "@escolalms/sdk/lib";

import { CourseProgramLesson } from "./CourseProgramLesson";
import { SharedComponentProps } from "./types";

interface Props extends SharedComponentProps {
  lessons: API.Lesson[];
  depth?: number;
}

export const RecursiveLessons: React.FC<Props> = ({
  lessons,
  depth = 0,
  onTopicClick,
  mobile,
}) => (
  <>
    {lessons.map((l, index) => (
      <CourseProgramLesson
        key={l.id}
        defaultOpen
        index={index}
        lesson={l}
        isSubLesson={depth > 0}
        onTopicClick={onTopicClick}
        mobile={mobile}
      >
        <RecursiveLessons
          lessons={l.lessons ?? []}
          depth={depth + 1}
          onTopicClick={onTopicClick}
          mobile={mobile}
        />
      </CourseProgramLesson>
    ))}
  </>
);
