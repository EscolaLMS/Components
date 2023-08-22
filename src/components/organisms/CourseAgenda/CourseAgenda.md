```js
import { useState, useCallback, useMemo } from "react";
import { ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";
import { getFlatTopics } from "../../../utils/course";

const flatTopics = useMemo(() => getFlatTopics(data.lessons), []);

const [state, setState] = useState({
  finishedTopicIds: [],
  currentTopicId: flatTopics[0].id,
});

const getRandomizedState = (lessons) =>
  lessons.map((l) => ({
    ...l,
    lessons: getRandomizedState(l.lessons ? l.lessons : []),
    topics: l.topics.map((t) => ({
      ...t,
      can_skip: Math.random() > 0.3,
    })),
  }));

const [stateWithRandomBlockers, setStateWithRandomBlockers] = useState(
  getRandomizedState(data.lessons)
);

const randomizeState = () => {
  const randomizedState = getRandomizedState(data.lessons);

  setStateWithRandomBlockers(randomizedState);
  setState({
    finishedTopicIds: [],
    currentTopicId: flatTopics[0].id,
  });
};

const changeTopicToNext = useCallback(() => {
  const currentTopicIndex = flatTopics.findIndex(
    (t) => t.id === state.currentTopicId
  );
  if (currentTopicIndex === -1) return;
  const nextTopic = flatTopics[currentTopicIndex + 1];

  if (!nextTopic) return;
  setState((prevState) => ({
    ...prevState,
    currentTopicId: nextTopic.id,
  }));
}, [flatTopics, state.currentTopicId]);

const markTopicFinished = useCallback(
  (topic) =>
    setState((prevState) => {
      const s = new Set([...prevState.finishedTopicIds, topic.id]);

      return {
        ...prevState,
        finishedTopicIds: Array.from(s),
      };
    }),
  []
);

const changeTopic = useCallback((topic) => {
  setState((prevState) => ({
    ...prevState,
    currentTopicId: topic.id,
  }));
}, []);

<ThemeTester flexDirection="column">
  <Button onClick={() => randomizeState()}>Randomize</Button>
  <div style={{ width: "100%" }}>
    <CourseAgenda
      lessons={stateWithRandomBlockers}
      finishedTopicIds={state.finishedTopicIds}
      currentTopicId={state.currentTopicId}
      onTopicClick={changeTopic}
      onMarkFinished={markTopicFinished}
      onNextTopicClick={changeTopicToNext}
    />
  </div>
  <div style={{ width: 375 }}>
    <CourseAgenda
      mobile
      lessons={stateWithRandomBlockers}
      finishedTopicIds={state.finishedTopicIds}
      currentTopicId={state.currentTopicId}
      onTopicClick={changeTopic}
      onMarkFinished={markTopicFinished}
      onNextTopicClick={changeTopicToNext}
    />
  </div>
</ThemeTester>;
```
