import React from "react";
import { useTranslation } from "react-i18next";
import type { API } from "@escolalms/sdk/lib";

import { Button, Text } from "../../../../index";
import { TopicIcon } from "./TopicIcon";
import type { SharedComponentProps } from "./types";

interface Props extends SharedComponentProps {
  index: number;
  topic: API.Topic;
}

export const CourseProgramTopic: React.FC<Props> = ({
  index,
  topic,
  onTopicClick,
  mobile,
}) => {
  const { t } = useTranslation();

  return (
    <li className="lesson__topic">
      <div className="lesson__description">
        <TopicIcon type={topic.topicable_type} />
        <Text className="lesson__index" size="14" noMargin>
          {index}.{" "}
        </Text>
        <Text size="14" noMargin>
          {topic.title}
        </Text>
      </div>
      {topic.preview && (
        <Button
          mode="outline"
          onClick={() => onTopicClick(topic)}
          block={mobile}
        >
          {t<string>("Course.topicPreview")}
        </Button>
      )}
    </li>
  );
};
