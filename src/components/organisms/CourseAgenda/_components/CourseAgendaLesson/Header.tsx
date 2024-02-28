import React from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";

import { Text, Button, Icon } from "../../../../../index";
import { format } from "date-fns";
import { DAY_FORMAT } from "../../../../../utils/utils";

interface Props {
  lesson: API.Lesson;
  index: number;
  open: boolean;
  onClick: () => void;
  onToggleClick: () => void;
  isSubLesson: boolean;
  isModuleFinished?: boolean;
  isLessonActive?: boolean;
}

export const Header: React.FC<Props> = ({
  lesson,
  index,
  open,
  onClick,
  onToggleClick,
  isSubLesson,
  isModuleFinished,
  isLessonActive,
}) => {
  const { t } = useTranslation();

  return (
    <header>
      <div
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        role="button"
        tabIndex={0}
        className={`lesson__header ${
          !isLessonActive ? "lesson__header--inactive" : ""
        }`}
      >
        {!isSubLesson && (
          <div
            className={`lesson__details ${
              isModuleFinished ? "lesson__details--finished" : ""
            }`}
          >
            <Text noMargin size="11" bold>
              {t<string>("Course.Lesson")} {index + 1}
            </Text>
          </div>
        )}
        <Text className="lesson__title" size="13" bold noMargin>
          {lesson.title}
        </Text>
        {!isLessonActive && lesson.active_from && (
          <Text className="lesson__locked" size="11" noMargin bold>
            <Icon name="lockTime" />
            {t("CourseAgenda.ActiveFrom")}{" "}
            {format(new Date(lesson.active_from), DAY_FORMAT)}
          </Text>
        )}
      </div>
      {!isSubLesson && (
        <Button
          type="button"
          onClick={onToggleClick}
          mode="icon"
          aria-label={t<string>(open ? "Actions.Hide" : "Action.Show")}
        >
          <Icon name="chevron" />
        </Button>
      )}
    </header>
  );
};
