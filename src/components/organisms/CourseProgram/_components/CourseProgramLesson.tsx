import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { API } from "@escolalms/sdk/lib";

import { Button, Icon, Text } from "../../../../index";
import { CourseProgramTopic } from "./CourseProgramTopic";
import type { SharedComponentProps } from "./types";

interface Props extends SharedComponentProps {
  lesson: API.Lesson;
  index: number;
  defaultOpen?: boolean;
  isSubLesson: boolean;
  children: React.ReactNode;
}

export const CourseProgramLesson: React.FC<Props> = ({
  lesson,
  index,
  defaultOpen = true,
  onTopicClick,
  mobile,
  isSubLesson,
  children,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li
      className={`lesson__item ${open ? "open" : "closed"} ${
        isSubLesson ? "sub-lesson" : ""
      }`}
    >
      <header>
        <div className="lesson__details">
          <Text noMargin size="12">
            {t<string>(isSubLesson ? "Course.SubLesson" : "Course.Lesson")}{" "}
            {index + 1}
          </Text>
          <Text noMargin size="12">
            {lesson.duration && lesson.duration}
          </Text>
        </div>
        <div>
          <Text size="14" bold noMargin>
            {lesson.title}
          </Text>
        </div>
        <Button
          type="button"
          onClick={() => setOpen(!open)}
          mode="icon"
          aria-label={t(open ? "Actions.Hide" : "Actions.Hide")}
        >
          <Icon name="chevron" />
        </Button>
      </header>
      {(lesson.lessons?.length ?? 0) > 0 && (
        <ul className="lesson__lessons">{children}</ul>
      )}
      <ul className="lesson__topics">
        {lesson.topics?.map((topic, topicIndex) => (
          <CourseProgramTopic
            key={topicIndex}
            topic={topic}
            index={topicIndex + 1}
            onTopicClick={onTopicClick}
            mobile={mobile}
          />
        ))}
      </ul>
    </li>
  );
};
