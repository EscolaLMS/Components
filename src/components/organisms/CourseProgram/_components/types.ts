import { API } from "@escolalms/sdk/lib";

export interface SharedComponentProps {
  mobile?: boolean;
  onTopicClick: (topic: API.Topic) => void;
}
