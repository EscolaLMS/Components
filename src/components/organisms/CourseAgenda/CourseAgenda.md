```js
import img1 from "./CourseAgenda.png";
import { useState } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";

const generateRandomState = (lessons) => {
  const flatTopics = lessons.reduce(
    (acc, curr) => [...acc, ...curr.topics],
    []
  );

  const rndTopicIds = flatTopics
    .filter(() => Math.random() > 0.5)
    .map((topic) => topic.id);

  const rndTopicId = (
    flatTopics.find(() => Math.random() > 0.5) || flatTopics[0]
  ).id;

  return {
    rndTopicIds,
    rndTopicId,
  };
};

const rnaData = generateRandomState(data.lessons);

const [state, setState] = useState({
  finishedTopicIds: rnaData.rndTopicIds,
  currentTopicId: rnaData.rndTopicId,
});

const generateRandomData = () => {
  const rnaData = generateRandomState(data.lessons);
  setState({
    finishedTopicIds: rnaData.rndTopicIds,
    currentTopicId: rnaData.rndTopicId,
  });
};

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Button onClick={() => generateRandomData()} mode="secondary">
      rnd
    </Button>

    <div style={{ width: "100%" }}>
      <CourseAgenda
        lessons={data.lessons}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => console.log("onTopicClick topic", topic)}
        onMarkFinished={(topic) => console.log("onMarkFinished topic", topic)}
        onGoToNextTopic={(topic) => console.log("onGoToNextTopic topic", topic)}
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
        onGoToNextTopic={(topic) => console.log("onGoToNextTopic topic", topic)}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
