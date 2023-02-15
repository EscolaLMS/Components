import { Topic } from "@escolalms/sdk/lib/types/api";
import { Button } from "../../../atoms/Button/Button";

import Text from "../../../atoms/Typography/Text";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SharedComponentProps, useTopicsContext } from "../CourseAgenda";
import { CurrentIcon, FinishedIcon, PendingIcon } from "./Icons";

export interface CourseAgendaTopicProps
  extends Omit<
    SharedComponentProps,
    "onMarkFinished" | "onTopicClick" | "onNextTopicClick"
  > {
  index: number;
  topic: Topic;
  clickable: boolean;
  mode: "pending" | "current" | "finished";
}

const TopicIcon: React.FC<{ mode: CourseAgendaTopicProps["mode"] }> = ({
  mode,
}) => {
  switch (mode) {
    case "current":
      return <CurrentIcon />;
    case "finished":
      return <FinishedIcon />;
    case "pending":
      return <PendingIcon />;
  }
};

const CourseAgendaTopic: FC<CourseAgendaTopicProps> = ({
  index,
  topic,
  mode,
  finishedTopicIds,
  clickable,
}) => {
  const { t } = useTranslation();
  const { onMarkFinished, onTopicClick, onNextTopicClick } = useTopicsContext();
  const onClick = useCallback(() => {
    if (mode !== "current") {
      onTopicClick && onTopicClick(topic);
    }
  }, [mode]);

  return (
    <li className={`lesson__topic lesson__topic-${mode}`}>
      <div
        className={"lesson__description"}
        tabIndex={clickable ? 0 : -1}
        onClick={() => clickable && onClick()}
        onKeyDown={(e) => clickable && e.key === "Enter" && onClick()}
        role="button"
      >
        <TopicIcon mode={mode} />
        <Text
          className={"lesson__index"}
          size={"14"}
          noMargin
          bold={mode === "current"}
        >
          {index}.{" "}
        </Text>
        <Text size={"14"} noMargin bold={mode === "current"}>
          {topic.title}
        </Text>
      </div>

      {mode === "current" && !finishedTopicIds.includes(topic.id) && (
        <Button
          block
          mode="outline"
          onClick={() => clickable && onMarkFinished && onMarkFinished(topic)}
        >
          {t<string>("Course.markAsFinished")}
        </Button>
      )}

      {mode === "current" && finishedTopicIds.includes(topic.id) && (
        <Button
          block
          mode="outline"
          onClick={() => onNextTopicClick && onNextTopicClick()}
        >
          {t<string>("Course.nextTopic")}
        </Button>
      )}
    </li>
  );
};

export default CourseAgendaTopic;
