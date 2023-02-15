```js
import img1 from "./CourseAgenda.png";
import { useState, useCallback, useEffect } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";

const flatTopics = data.lessons.reduce(
  (acc, curr) => (Array.isArray(curr.topics) ? [...acc, ...curr.topics] : acc),
  []
);

const [state, setState] = useState({
  finishedTopicIds: [],
  currentTopicId: flatTopics[0].id,
});

const [stateWithRandomBlockers, setStateWithRandomBlockers] = useState([]);

const randomizeState = () => {
  const randomizedState = data.lessons.map((lesson) => ({
    ...lesson,
    topics: lesson.topics.map((topic) => ({
      ...topic,
      can_skip: Math.random() > 0.3,
    })),
  }));

  setStateWithRandomBlockers(randomizedState);
  setState({
    finishedTopicIds: [],
    currentTopicId: flatTopics[0].id,
  });
};

const onNextTopic = useCallback(() => {
  let nextTopicId;
  data.lessons.forEach((lesson, lIndex) => {
    lesson.topics.forEach((topic, tIndex) => {
      if (topic.id === state.currentTopicId) {
        // try find next topic in current lesson
        if (lesson.topics[tIndex + 1]) {
          nextTopicId = lesson.topics[tIndex + 1];
          // try find first topic in next lesson
        } else if (data.lessons[lIndex + 1]) {
          nextTopicId = data.lessons[lIndex + 1].topics[0];
          // otherwise this is end so going back to first lesson and topic
        } else {
          nextTopicId = data.lessons[0].topics[0];
        }
      }
    });
  });

  setState((prevState) => ({
    ...prevState,
    currentTopicId: nextTopicId.id,
  }));
}, [state.currentTopicId]);

const onTopicFinished = useCallback(
  (topic) => {
    setState((prevState) => {
      return {
        finishedTopicIds: [...prevState.finishedTopicIds, topic.id],
        currentTopicId: prevState.currentTopicId,
      };
    });

    onNextTopic();
  },
  [state.currentTopicId]
);

const onTopicChange = useCallback((topic) => {
  setState((prevState) => {
    return {
      ...prevState,
      currentTopicId: topic.id,
    };
  });
}, []);

useEffect(() => {
  randomizeState();
}, []);

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Button onClick={() => randomizeState()}>Randomize</Button>
    <div style={{ width: "100%" }}>
      <CourseAgenda
        lessons={stateWithRandomBlockers}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => onTopicChange(topic)}
        onMarkFinished={(topic) => onTopicFinished(topic)}
      />
    </div>
    <div style={{ width: 375 }}>
      <CourseAgenda
        mobile
        lessons={stateWithRandomBlockers}
        finishedTopicIds={state.finishedTopicIds}
        currentTopicId={state.currentTopicId}
        onTopicClick={(topic) => onTopicChange(topic)}
        onMarkFinished={(topic) => onTopicFinished(topic)}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
