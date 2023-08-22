import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";

import { Button } from "../../../atoms/Button/Button";
import { Icon } from "../../../atoms/Icon/Icon";
import Text from "../../../atoms/Typography/Text";
import { useCourseAgendaContext } from "./context";
import { CurrentIcon, PendingIcon } from "./Icons";

export interface CourseAgendaTopicProps {
  index: number;
  topic: API.Topic;
  clickable: boolean;
}

type IconState = "pending" | "finished" | "current";

const TopicIcon: React.FC<{ state: IconState }> = ({ state }) => {
  switch (state) {
    case "current":
      return <CurrentIcon />;
    case "finished":
      return <Icon name="finished" />;
    case "pending":
      return <PendingIcon />;
    default:
      return null;
  }
};

const CourseAgendaTopic: React.FC<CourseAgendaTopicProps> = ({
  index,
  topic,
  clickable,
}) => {
  const { t } = useTranslation();
  const {
    onMarkFinished,
    onTopicClick,
    onNextTopicClick,
    onCourseFinished,
    finishedTopicIds,
    currentNotLockedTopicId,
    flatTopics,
    notFinishedTopics,
  } = useCourseAgendaContext();

  const isFinished = useMemo(
    () => finishedTopicIds.includes(topic.id),
    [finishedTopicIds, topic.id]
  );
  const isCurrent = useMemo(
    () => currentNotLockedTopicId === topic.id,
    [currentNotLockedTopicId, topic.id]
  );

  const iconState: IconState = useMemo(() => {
    if (isCurrent) {
      return "current";
    }
    if (isFinished) {
      return "finished";
    }
    return "pending";
  }, [isFinished, isCurrent]);

  const onClick = useCallback(() => {
    if (isCurrent) return;

    onTopicClick?.(topic);
  }, [isCurrent]);

  const isLastTopic = useMemo(
    () => flatTopics.at(-1)?.id === topic.id,
    [flatTopics, topic.id]
  );

  const isOneTopicLeft = useMemo(
    () => notFinishedTopics.length === 1,
    [flatTopics, finishedTopicIds]
  );

  return (
    <li className={`lesson__topic lesson__topic-${iconState}`}>
      <div
        className="lesson__description"
        tabIndex={clickable ? 0 : -1}
        onClick={() => clickable && onClick()}
        onKeyDown={(e) => clickable && e.key === "Enter" && onClick()}
        role="button"
      >
        <TopicIcon state={iconState} />
        <Text
          className="lesson__index"
          size="14"
          noMargin
          bold={iconState === "current"}
        >
          {index}.{" "}
        </Text>
        <Text size="14" noMargin bold={iconState === "current"}>
          {topic.title}
        </Text>
      </div>

      {isCurrent && !isFinished && isOneTopicLeft && (
        <Button
          block
          mode="outline"
          onClick={() => {
            if (!clickable) return;
            onMarkFinished?.(topic);
            onCourseFinished?.();
          }}
        >
          {t<string>("Course.finishCourse")}
        </Button>
      )}

      {isCurrent && !isFinished && !isOneTopicLeft && (
        <Button
          block
          mode="outline"
          onClick={() => clickable && onMarkFinished?.(topic)}
        >
          {t<string>("Course.markAsFinished")}
        </Button>
      )}

      {isCurrent && isFinished && !isLastTopic && (
        <Button block mode="outline" onClick={onNextTopicClick}>
          {t<string>("Course.nextTopic")}
        </Button>
      )}
    </li>
  );
};

export default CourseAgendaTopic;
