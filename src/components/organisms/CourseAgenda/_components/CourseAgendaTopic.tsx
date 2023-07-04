import { Topic } from "@escolalms/sdk/lib/types/api";
import { Button } from "../../../atoms/Button/Button";

import Text from "../../../atoms/Typography/Text";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SharedComponentProps, useTopicsContext } from "../CourseAgenda";
import { CurrentIcon, FinishedIcon, PendingIcon } from "./Icons";
import { API } from "@escolalms/sdk/lib";

export interface CourseAgendaTopicProps
  extends Omit<
    SharedComponentProps,
    "onMarkFinished" | "onTopicClick" | "onNextTopicClick"
  > {
  index: number;
  topic: Topic;
  clickable: boolean;
  mode: "pending" | "current" | "finished";
  onCourseFinished: () => void;
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

export const getFlatTopics = (lessons: API.Lesson[]): API.Topic[] =>
  lessons.reduce(
    (acc, curr) => [
      ...acc,
      ...(curr.lessons ? getFlatTopics(curr.lessons as API.Lesson[]) : []),
      ...(curr.topics ?? []),
    ],
    [] as API.Topic[]
  ) as API.Topic[];

const CourseAgendaTopic: FC<CourseAgendaTopicProps> = ({
  index,
  topic,
  mode,
  finishedTopicIds,
  clickable,
  onCourseFinished,
}) => {
  const { t } = useTranslation();
  const { onMarkFinished, onTopicClick, onNextTopicClick, lessons } =
    useTopicsContext();
  const onClick = useCallback(() => {
    if (mode !== "current") {
      onTopicClick && onTopicClick(topic);
    }
  }, [mode]);

  const isLastTopic = getFlatTopics(lessons).at(-1)?.id === topic.id;
  const isTopicFinished = finishedTopicIds.includes(topic.id);

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

      {mode === "current" && !isTopicFinished && isLastTopic && (
        <Button
          block
          mode="outline"
          onClick={() => {
            if (!clickable) return;
            onMarkFinished && onMarkFinished(topic);
            onCourseFinished();
          }}
        >
          {t<string>("Course.finishCourse")}
        </Button>
      )}

      {mode === "current" && !isTopicFinished && !isLastTopic && (
        <Button
          block
          mode="outline"
          onClick={() => clickable && onMarkFinished && onMarkFinished(topic)}
        >
          {t<string>("Course.markAsFinished")}
        </Button>
      )}

      {mode === "current" && isTopicFinished && !isLastTopic && (
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
