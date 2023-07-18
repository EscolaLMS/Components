```js
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import ThemeTester from "../../../styleguide/ThemeTester";

const mock = {
  id: 737,
  title: "awdwad",
  lesson_id: 22,
  active: true,
  preview: false,
  topicable_id: 109,
  topicable_type: "EscolaLms\\TopicTypes\\Models\\TopicContent\\Image",
  topicable: {
    id: 109,
    value:
      "course/7/topic/737/image/I43KisiNXzAoZNyx7q9ddfHcdVXaC6fYTfrElUW9.jpg",
    width: 512,
    height: 512,
    created_at: "2022-05-30T09:47:14.000000Z",
    updated_at: "2022-05-30T09:47:14.000000Z",
  },
  summary: null,
  introduction: null,
  description: null,
  resources: [],
  order: 19,
  json: null,
  can_skip: false,
};

<React.Fragment>
  <EscolaLMSContextProvider
    apiUrl="https://api-stage.escolalms.com/"
    flexDirection="column"
  >
    <ThemeTester>
      <ImagePlayer topic={mock} onLoad={() => console.log("load")} />
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
