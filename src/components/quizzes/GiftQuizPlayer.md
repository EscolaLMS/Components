```js
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { ThemeTester } from "../../styleguide";

const topic = {
  id: 718,
  title: "Sample Quiz",
  lesson_id: 105,
  active: true,
  preview: false,
  topicable_id: 6,
  topicable_type: "EscolaLms\\TopicTypeGift\\Models\\GiftQuiz",
  topicable: {
    id: 6,
    value: "::Q3:: Two plus {=two =2} equals four.",
    max_attempts: 1111,
    max_execution_time: 11111,
  },
  summary: null,
  introduction: null,
  description: null,
  resources: [],
  order: 13,
  json: null,
  can_skip: false,
  duration: null,
};
<ThemeTester>
  <EscolaLMSContextProvider apiUrl="https://app.theonlineschool.s.escolait.pl">
    <GiftQuizPlayer topic={topic} />
  </EscolaLMSContextProvider>
</ThemeTester>;
```
