import React from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";
import { ChevronIcon } from "../Icons";

import { Text, Button } from "../../../../../index";

interface Props {
  lesson: API.Lesson;
  index: number;
  open: boolean;
  onClick: () => void;
  onToggleClick: () => void;
  isSubLesson: boolean;
}

export const Header: React.FC<Props> = ({
  lesson,
  index,
  open,
  onClick,
  onToggleClick,
  isSubLesson,
}) => {
  const { t } = useTranslation();

  return (
    <header>
      <div
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        role="button"
        tabIndex={0}
        className="lesson__header"
      >
        <div className="lesson__details">
          <Text noMargin size="12">
            {t<string>(isSubLesson ? "Course.SubLesson" : "Course.Lesson")}{" "}
            {index + 1}
          </Text>
          <Text noMargin size="12">
            {lesson.duration}
          </Text>
        </div>
        <Text size="13" bold noMargin>
          {lesson.title}
        </Text>
      </div>
      <Button
        type="button"
        onClick={onToggleClick}
        mode="icon"
        aria-label={t<string>(open ? "Actions.Hide" : "Action.Show")}
      >
        <ChevronIcon />
      </Button>
    </header>
  );
};
