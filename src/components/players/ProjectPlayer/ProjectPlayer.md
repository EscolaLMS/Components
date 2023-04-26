```js
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

import ThemeTester from "../../../styleguide/ThemeTester";

const mockTopic = {
    "id": 1432,
    "title": "William Shakespeare",
    "lesson_id": 255,
    "active": true,
    "preview": true,
    "topicable_id": 1,
    "topicable_type": "EscolaLms\\TopicTypeProject\\Models\\Project",
    "topicable": {
        "id": 1,
        "value": "theProject",
        "created_at": "2023-04-06T11:38:54.000000Z",
        "updated_at": "2023-04-06T11:38:54.000000Z"
    },
    "description": "Write an essay on the life of William Shakespeare. It must consist of at least 250 words. Accepted file types are: pdf, docx.",
    "resources": [],
    "order": 1,
    "can_skip": false,
    "duration": "5 min"
};

<EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com">
  <ThemeTester>
      <ProjectPlayer topic={mockTopic} />
  </ThemeTester>
</EscolaLMSContextProvider>;
```
