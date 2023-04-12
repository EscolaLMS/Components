```js
import img1 from "./CourseAgenda.png";
import { useState, useCallback, useEffect, useMemo } from "react";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Button } from "../../../";
import data from "./mock.json";
import "../../../styleguide/i18n.ts";

// const flatTopics = data.lessons.reduce(
//   (acc, curr) => (Array.isArray(curr.topics) ? [...acc, ...curr.topics] : acc),
//   []
// );
const flattenTopics = (lessons) => {
  return lessons.flatMap((lesson) => {
    if (lesson.topics) {
      return [...lesson.topics, ...flattenTopics(lesson.lessons || [])];
    }
    return [];
  });
};

const flatTopics = useMemo(() => flattenTopics(data.lessons), [data.lessons]);
console.log('flatTopics: ', flatTopics);
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

const getLessonIndexWithNestedTopic = (currentTopicId) => {
  let index = 0;
  data.lessons.find((lesson, lIndex) => {
    lesson.topics.find((topic) => {
      if (topic.id === currentTopicId) {
        index = lIndex;
      } else if (lesson.lessons) {
        const findTopicAndReturnIndex = (lessons) => {
          lessons.find((lesson) => {
            lesson.topics.find((topic) => {
              if (topic.id === currentTopicId) {
                index = lIndex;
              } else if (lesson.lessons) {
                findTopicAndReturnIndex(lesson.lessons)
              }
            });
          });
        };
        findTopicAndReturnIndex(lesson.lessons);
      }
    });
  });
  return index;
};

const findNextTopic = (currentTopicId, lessons) => {
  let nextTopic = null;
  lessons.forEach((lesson, lIndex) => {
    if (lesson.topics) {
      lesson.topics.forEach((topic, tIndex) => {
        // Check is last topic and don't have lessons
        if (currentTopicId === lesson.topics[lesson.topics.length - 1].id && !lesson.lessons) {
          const currentLessonIndex = getLessonIndexWithNestedTopic(currentTopicId);
          if (data.lessons[currentLessonIndex + 1]) {
            // Here we need index of main current module lesson
            nextTopic = data.lessons[currentLessonIndex + 1].topics[0];
          } else {
            nextTopic = data.lessons[0].topics[0];
          }
        } else {
          if (topic.id === currentTopicId) {
            if (tIndex < lesson.topics.length - 1) {
              nextTopic = lesson.topics[tIndex + 1];
            } else if (lesson.lessons && lesson.lessons.length > 0) {
              nextTopic = lesson.lessons[0].topics[0];
            }
          } else if (!nextTopic && lesson.lessons) {
            nextTopic = findNextTopic(currentTopicId, lesson.lessons);
          }
        }
      });
    }
  });
  return nextTopic;
};

const onNextTopic = useCallback(() => {
  const nextTopicId = findNextTopic(state.currentTopicId, data.lessons);
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
  [state.currentTopicId, data.lessons]
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
        onNextTopicClick={(topic) => onNextTopic(topic)}
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
        onNextTopicClick={(topic) => onNextTopic(topic)}
      />
    </div>
  </ThemeTester>
  <ImageModal images={[img1]} />
</React.Fragment>;
```
