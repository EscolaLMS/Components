import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";

import { Text } from "../../../../../index";
import { useCourseAgendaContext } from "../../context";
import { LockIcon } from "../Icons";

/*
1. CSS grid starts with 1 as closest to the edge value
2. JS Arrays are counting from 0 - first shift by 1
3. First topic with can_skip=false should be actually visible - second shift by 1
*/
const GRID_PURPOSES_NUMBER = 2;

interface Props {
  lesson: API.Lesson;
  isLessonLocked: boolean;
}

export const LockedOverlay: React.FC<Props> = ({ lesson, isLessonLocked }) => {
  const { firstBlockingTopic, positionInLessonOfFirstBlockingTopic } =
    useCourseAgendaContext();
  const { t } = useTranslation();

  const gridStartingPosition =
    positionInLessonOfFirstBlockingTopic + GRID_PURPOSES_NUMBER;
  const totalHeightOfOverlay = useMemo(() => {
    if (!Array.isArray(lesson?.topics)) return 0;

    return lesson.topics.length - positionInLessonOfFirstBlockingTopic - 1;
  }, [lesson?.topics, positionInLessonOfFirstBlockingTopic]);

  const overlayTextWhenLessonIsLocked =
    totalHeightOfOverlay > 2
      ? t("CourseAgenda.FinishRequiredTopicsBefore")
      : t("CourseAgenda.FirstFinishRequiredTopics");

  const overlayTextWhenTopicIsLocked =
    totalHeightOfOverlay > 1
      ? t("CourseAgenda.YouHaveToCompleteTopic")
      : t("CourseAgenda.TopicIsLocked");

  return (
    <li
      className={`lesson__overlay ${
        totalHeightOfOverlay === 1 ? "lesson__overlay--row" : ""
      }`}
      style={{
        gridRowStart: isLessonLocked ? 1 : gridStartingPosition,
      }}
    >
      <LockIcon />
      {isLessonLocked ? (
        <>
          <Text size="13" noMargin className="lesson__overlay-text">
            {overlayTextWhenLessonIsLocked}
          </Text>
          {totalHeightOfOverlay > 2 && (
            <Text size="12" noMargin className="lesson__overlay-text">
              {t("CourseAgenda.TopicToComplete")}:{" "}
              <span className="lesson__overlay-text lesson__overlay-text--emphasized">
                {firstBlockingTopic?.title}
              </span>
            </Text>
          )}
        </>
      ) : (
        <Text size="13" noMargin className="lesson__overlay-text">
          {overlayTextWhenTopicIsLocked}
          <span className="lesson__overlay-text lesson__overlay-text--emphasized">
            {totalHeightOfOverlay < 3 &&
              totalHeightOfOverlay > 1 &&
              positionInLessonOfFirstBlockingTopic !== -1 &&
              ` nr. ${positionInLessonOfFirstBlockingTopic + 1} `}
            {totalHeightOfOverlay >= 3 && ` ${firstBlockingTopic?.title} `}
          </span>
          <span className="lesson__overlay-text lesson__overlay-text--additional">
            {totalHeightOfOverlay > 2 && t("CourseAgenda.ToAccessTheFollowing")}
          </span>
        </Text>
      )}
    </li>
  );
};
