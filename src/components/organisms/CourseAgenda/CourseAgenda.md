```js
import img1 from "./CourseAgenda.png";
import { useState } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";

const [state, setState] = useState({
  finishedTopicIds: [1684, 683],
  currentTopicId: 684,
});

<React.Fragment>
  <ThemeTester flexDirection="column">
    <div style={{ width: "100%" }}>
      <CourseAgenda
        lessons={data.lessons}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => console.log("onTopicClick topic", topic)}
        onMarkFinished={(topic) => console.log("onMarkFinished topic", topic)}
      />
    </div>
    <div style={{ width: 375 }}>
      <CourseAgenda
        mobile
        lessons={data.lessons}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => console.log("onTopicClick topic", topic)}
        onMarkFinished={(topic) => console.log("onMarkFinished topic", topic)}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
