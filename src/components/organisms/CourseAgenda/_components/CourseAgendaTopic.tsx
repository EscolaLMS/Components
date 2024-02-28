import React, { useCallback, useMemo } from "react";
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

type State = "available" | "finished" | "current" | "locked";

const TopicIcon: React.FC<{ state: State }> = ({ state }) => {
  const theme = React.useContext(ThemeContext);
  switch (state) {
    case "current":
      return <Icon name="current" color={theme.primaryColor} />;
    case "finished":
      return <Icon name="finished" />;
    case "available":
      return <></>;
    default:
      return <Icon name='lock' />;
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
    availableTopicsIds
  } = useCourseAgendaContext();

  const isFinished = useMemo(
    () => finishedTopicIds.includes(topic.id),
    [finishedTopicIds, topic.id]
  );
  const isCurrent = useMemo(
    () => currentNotLockedTopicId === topic.id,
    [currentNotLockedTopicId, topic.id]
  );

  const state: State = useMemo(() => {
    if (isCurrent) {
      return "current";
    }
    if (isFinished) {
      return "finished";
    }
    if (availableTopicsIds?.includes(topic.id)) {
      return 'available';
    }

    return 'locked';
  }, [isFinished, isCurrent, availableTopicsIds]);

  const onClick = useCallback(() => {
    if (isCurrent || state === "locked") return;

    onTopicClick?.(topic);
  }, [isCurrent, state]);

  return (
    <li className={`lesson__topic lesson__topic--${state}`}>
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
