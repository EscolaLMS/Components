```js
import img1 from "./CourseAgenda.png";
import { useState, useCallback } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";

const flatTopics = data.lessons.reduce(
  (acc, curr) => (Array.isArray(curr.topics) ? [...acc, ...curr.topics] : acc),
  []
);

const [state, setState] = useState({
  finishedTopicIds: flatTopics
    .filter(() => Math.random() > 0.5)
    .map((topic) => topic.id),
  currentTopicId:
    flatTopics.find(() => Math.random() > 0.8).id || flatTopics[0].id,
});

const onTopicFinished = useCallback((topic) => {
  console.log("onTopicFinished", topic);
  setState((prevState) => {
    return {
      finishedTopicIds: [...prevState.finishedTopicIds, topic.id],
      currentTopicId: prevState.currentTopicId,
    };
  });
}, []);

const onTopicChange = useCallback((topic) => {
  console.log("onTopicChange", topic);
  setState((prevState) => {
    return {
      ...prevState,
      currentTopicId: topic.id,
    };
  });
}, []);

const onNextTopic = useCallback(() => {
  console.log("onNextTopic");
  let nextTopicId;

  data.lessons.forEach((lesson, lIndex) => {
    lesson.topics.forEach((topic, tIndex) => {
      if (topic.id === state.currentTopicId) {
        // try find next topic in current lesson
        if (lesson.topics[tIndex + 1]) {
          nextTopicId = lesson.topics[tIndex + 1].id;
          // try find first topic in next lesson
        } else if (lessons[lIndex + 1]) {
          nextTopicId = lessons[lIndex + 1].topics[0].id;
          // otherwise this is end so going back to first lesson and topic
        } else {
          nextTopicId = lessons[0].topics[0].id;
        }
      }
    });
  });

  setState((prevState) => {
    return {
      ...prevState,
      currentTopicId: nextTopicId,
    };
  });
}, [state]);

<React.Fragment>
  <ThemeTester flexDirection="column">
    <div style={{ width: "100%" }}>
      <CourseAgenda
        lessons={data.lessons}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => onTopicChange(topic)}
        onMarkFinished={(topic) => onTopicFinished(topic)}
        onNextTopicClick={(topic) => onNextTopic(topic)}
      />
    </div>
    <div style={{ width: 375 }}>
      <CourseAgenda
        mobile
        lessons={data.lessons}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => onTopicChange(topic)}
        onMarkFinished={(topic) => onTopicFinished(topic)}
        onNextTopicClick={(topic) => onNextTopic(topic)}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
