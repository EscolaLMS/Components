import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { API } from "@escolalms/sdk/lib";
import { ThemeContext } from "styled-components";

import { Icon } from "../../../atoms/Icon/Icon";
import Text from "../../../atoms/Typography/Text";
import { useCourseAgendaContext } from "./context";

export interface CourseAgendaTopicProps {
  index: number;
  topic: API.Topic;
  clickable: boolean;
}

enum StateTypes {
  CURRENT = "current",
  AVAILABLE = "available",
  FINISHED = "finished",
  LOCKED = "locked",
}

const TopicIcon: React.FC<{ state: StateTypes }> = ({ state }) => {
  const theme = React.useContext(ThemeContext);
  switch (state) {
    case StateTypes.CURRENT:
      return <Icon name="current" color={theme.primaryColor} />;
    case StateTypes.FINISHED:
      return <Icon name="finished" />;
    case StateTypes.AVAILABLE:
      return <></>;
    default:
      return <Icon name="lock" />;
  }
};

const CourseAgendaTopic: React.FC<CourseAgendaTopicProps> = ({
  topic,
  clickable,
}) => {
  const {
    onTopicClick,
    finishedTopicIds,
    currentNotLockedTopicId,
    availableTopicsIds,
  } = useCourseAgendaContext();
  const ref = useRef<HTMLLIElement | null>(null);

  const isFinished = useMemo(
    () => finishedTopicIds.includes(topic.id),
    [finishedTopicIds, topic.id]
  );
  const isCurrent = useMemo(
    () => currentNotLockedTopicId === topic.id,
    [currentNotLockedTopicId, topic.id]
  );

  useEffect(() => {
    if (isCurrent) {
      ref?.current?.scrollIntoView({
        behavior: "smooth",
        block: 'nearest',
      });
    }
  }, [ref?.current, isCurrent]);

  const state: StateTypes = useMemo(() => {
    if (isCurrent) {
      return StateTypes.CURRENT;
    }
    if (isFinished) {
      return StateTypes.FINISHED;
    }
    if (availableTopicsIds?.includes(topic.id)) {
      return StateTypes.AVAILABLE;
    }

    return StateTypes.LOCKED;
  }, [isFinished, isCurrent, availableTopicsIds]);

  const onClick = useCallback(() => {
    if (isCurrent || state === "locked") return;

    onTopicClick?.(topic);
  }, [isCurrent, state]);

  return (
    <li ref={ref} className={`lesson__topic lesson__topic--${state}`}>
      <div
        className="lesson__description"
        tabIndex={clickable ? 0 : -1}
        onClick={() => clickable && onClick()}
        onKeyDown={(e) => clickable && e.key === "Enter" && onClick()}
        role="button"
      >
        <Text size="13" noMargin bold={state === "current"}>
          {topic.title}
        </Text>
        <TopicIcon state={state} />
      </div>
    </li>
  );
};

export default CourseAgendaTopic;
